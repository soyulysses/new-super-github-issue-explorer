import React, {Fragment, useEffect, useState} from "react"
import headerClasses from "../components/UI/Header.module.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import Card from "../components/UI/Card"
import Label from "../components/UI/Label"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BasePage from "../components/Common/BasePage"
import IssueTitle from "./Issue/components/IssueTitle"
import IssueUserName from "./Issue/components/IssueUserName"
import IssueCommentThreadLine from "./Issue/components/IssueCommentThreadLine"
import classes from "./Issue.module.css"

export enum IssueType {
  ISSUE,
  PULL
}

type IssueLabelModel = {
  name: string,
  color: string
}

type IssueModel = {
  title: string,
  user_name: string,
  user_label: string,
  date: string
  body: string,
  type: IssueType
  labels: IssueLabelModel[]
}

type CommentModel = {
  user_name: string,
  user_label: string
  body: string,
}

const Issue = () => {
  const navegate = useNavigate();
  const {userId, repoId, issueId} = useParams();
  const [issue, setIssue] = useState<IssueModel | undefined>()
  const [commentList, setCommentList] = useState<CommentModel[] | undefined>()

  useEffect(() => {
    async function requestIssue() {
      try {
        const requestIssue = await fetch(`https://api.github.com/repos/${userId}/${repoId}/issues/${issueId}`)
        const dataIssue = await requestIssue.json()
        const requestComments = await fetch(`https://api.github.com/repos/${userId}/${repoId}/issues/${issueId}/comments?per_page=100`)
        const dataComments = await requestComments.json()

        if ((await dataIssue).length === 0) navegate('/error/404')

          setIssue(
            {
              title: await dataIssue.title,
              user_name: await dataIssue.user.login,
              user_label: await dataIssue.author_association,
              date: (await dataIssue.created_at).substring(0, 10),
              body: await dataIssue.body,
              type: (!!await dataIssue.pull_request) ? IssueType.PULL : IssueType.ISSUE,
              labels: [...await dataIssue.labels.map(({name, color}:any) => ({name,color}))]
            }
          )

        setCommentList([...await dataComments.map((comment:any) => (
          {
            user_name: comment.user.login,
            user_label: comment.author_association,
            body: comment.body
          }
        ))])
      } catch (e) {
        navegate('/error/404')
      }
    }

    requestIssue()

    return (() => {
      setIssue(undefined)
      setCommentList(undefined)
    })
  }, [userId, repoId, issueId, navegate])

  return (
    <BasePage childrenHeader={<Link to={`/search/${userId}/${repoId}`} className={headerClasses.header_button}>‹ BACK</Link>}>
      {(issue)
        ? <Card>
          <div className={classes.IssueHeader}>
            <IssueUserName label={issue.user_label} name={issue.user_name} />
            <div className={classes.IssueLabels}>
              {issue.labels.map((label, index) =>
                <Label key={`${index}_label`} color={label.color} name={label.name} />
              )}
            </div>
          </div>
          <IssueTitle type={issue.type} title={issue.title} date={issue.date} url={`https://github.com/${userId}/${repoId}/issues/${issueId}`} />
          { (issue.body !== '') ? <div className={classes.IssueBody} children={<ReactMarkdown children={issue.body} remarkPlugins={[remarkGfm]} />} /> : ''}
        </Card>
        : ''
      }

      {commentList?.map((comment: CommentModel, index: number) =>
        <Fragment key={`${index}_comment`}>
          <IssueCommentThreadLine />
          <Card>
            <IssueUserName label={comment.user_label} name={comment.user_name} />
            <div className={classes.IssueBody}  children={<ReactMarkdown children={comment.body} remarkPlugins={[remarkGfm]} />} />
          </Card>
        </Fragment>
      )}

    </BasePage>
  )
}

export default Issue
