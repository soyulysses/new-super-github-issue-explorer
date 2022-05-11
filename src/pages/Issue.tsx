import React, {Fragment, useEffect, useState} from "react"
import classes from "../components/UI/Header.module.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import Card from "../components/UI/Card"
import Label from "../components/UI/Label"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BasePage from "../components/Common/BasePage"
import IssueTitle from "./Issue/IssueTitle"
import IssueUserName from "./Issue/IssueUserName"
import IssueCommentThreadLine from "./Issue/IssueCommentThreadLine"
import IssueBody from "./Issue/IssueBody.module"

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
  const [issue, setIssue] = useState<IssueModel | undefined>(undefined)
  const [commentList, setCommentList] = useState<CommentModel[] | undefined>(undefined)

  useEffect(() => {
    async function requestIssue() {
      try {
        const requestIssue = await fetch(`https://api.github.com/repos/${userId}/${repoId}/issues/${issueId}`)
        const dataIssue = await requestIssue.json()
        const requestComments = await fetch(`https://api.github.com/repos/${userId}/${repoId}/issues/${issueId}/comments?per_page=100`)
        const dataComments = await requestComments.json()

        if (await dataIssue.isEmpty) navegate('/')

          setIssue(
            {
              title: await dataIssue.title,
              user_name: await dataIssue.user.login,
              user_label: await dataIssue.author_association,
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
        navegate('/')
      }
    }

    requestIssue()

    return (() => {
      setIssue(undefined)
      setCommentList(undefined)
    })
  }, [userId, repoId, issueId, navegate])

  return (
    <BasePage childrenHeader={<Link to='/' className={classes.header_button}>‹ BACK</Link>}>

      {(issue) ?
      <Card>
        {/* TODO:
          *   - Cambiar <div /> por un nuevo componente llamado <IssueHeader />
          */}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px'}}>
          <IssueUserName label={issue.user_label} name={issue.user_name} />

          {/* TODO:
            *   - Cambiar <div /> por un nuevo componente llamado <IssueLabels />
            */}
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {issue.labels.map((label, index) =>
              <Label key={`${index}_label`} color={label.color} name={label.name} />
            )}
          </div>
        </div>

        <IssueTitle type={issue.type} title={issue.title} url={`https://github.com/${userId}/${repoId}/issues/${issueId}`} />

        <IssueBody children={<ReactMarkdown children={issue.body} remarkPlugins={[remarkGfm]} />} />
      </Card>
      : ''}

      {commentList?.map((comment: CommentModel, index: number) =>
        <Fragment key={`${index}_comment`}>
          <IssueCommentThreadLine />
          <Card>
            <IssueUserName label={comment.user_label} name={comment.user_name} />
            <IssueBody children={<ReactMarkdown children={comment.body} remarkPlugins={[remarkGfm]} />} />
          </Card>
        </Fragment>
      )}

    </BasePage>
  )
}

export default Issue
