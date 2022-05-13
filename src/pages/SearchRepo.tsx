import React, {Fragment, useEffect, useState} from "react"
import BasePage from "../components/Common/BasePage"
import {Link, useNavigate, useParams} from "react-router-dom"
import headerClasses from "../components/UI/Header.module.css"
import Card from "../components/UI/Card"
import IssueTitle from "./Issue/components/IssueTitle"
import {IssueType} from "./Issue"
import classes from "./Issue.module.css"
import Label from "../components/UI/Label"
import IssueUserName from "./Issue/components/IssueUserName"

const SearchRepo = () => {
  const navigate = useNavigate()
  const {userId, repoId, page = 1} = useParams()
  const [issuesList, setIssuesList] = useState<any[]>([])

  useEffect(() => {
    async function requestIssuesFromRepo() {
      try {
        const requestIssue = await fetch(`https://api.github.com/repos/${userId}/${repoId}/issues?per_page=30&page=${page}`)
        const dataIssue = await requestIssue.json()

        if ((await dataIssue).length === 0) navigate('/error/404')

        setIssuesList([...await dataIssue])

      } catch (e) {
        navigate('/error/404')
      }
    }

    requestIssuesFromRepo()

    return (() => {
      setIssuesList([])
    })
  }, [page, userId, repoId, navigate])

  return (
    <BasePage  childrenHeader={
      <Fragment>
        <Link to='/' className={headerClasses.header_button}>‹ BACK</Link>
        <div className={headerClasses.filler} />
        <ul style={{display: 'flex', gap: '16px', alignItems: 'center', color: 'white', fontSize: '1.25rem', padding: 0, listStyle: 'none'}}>
          <li>{'DEBUG: '}</li>
          <li style={{backgroundColor: 'rgba(255,255,255,.12)', padding: '4px 8px', borderRadius: '6px'}}>{(userId) ? '✔️ userId' : '❌ userId'}</li>
          <li style={{backgroundColor: 'rgba(255,255,255,.12)', padding: '4px 8px', borderRadius: '6px'}}>{(repoId) ? '✔️ repoId' : '❌ repoId'}</li>
          <li style={{backgroundColor: 'rgba(255,255,255,.12)', padding: '4px 8px', borderRadius: '6px'}}>{(page && page !== 1) ? '✔️ Page' : '❌ Page'}</li>
        </ul>
      </Fragment>
    }>
    <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}} children={
      issuesList.map((issue: any, index:number) => {
        return (
          <div key={`issue_${index}`} style={{cursor:'pointer'}} onClick={() => {navigate(`/issue/${userId}/${repoId}/${issue.number}`)}}>
            <Card>
              <IssueTitle type={(!!issue.pull_request) ? IssueType.PULL : IssueType.ISSUE} title={issue.title} date={issue.created_at.substring(0, 10)} url={issue.html_url} />
              <div className={classes.IssueHeader}>
                <IssueUserName label={issue.user.type.toUpperCase()} name={issue.user.login} />
                <div className={classes.IssueLabels}>
                  {issue.labels.map((label:any, index:any) =>
                    <Label key={`${index}_label`} color={label.color} name={label.name} />
                  )}
                  <Label solid color={'FFFFFF'} name={`💬 ${issue.comments}`} />
                </div>
              </div>
            </Card>
          </div>
        )
      })
    } />
      { (issuesList.length !== 0)
        ?  <div style={{display: 'flex', justifyContent: 'center', paddingTop: '32px', gap: '32px'}}>
            <Link style={{backgroundColor: "white", fontSize: '1.3rem', padding: '4px 32px', color: 'black', textDecoration: 'none', borderRadius: '99px'}} to={`/search/${userId}/${repoId}/${Number(page) - 1}`}>{'❰'}</Link>
            <Link style={{backgroundColor: "white", fontSize: '1.3rem', padding: '4px 32px', color: 'black', textDecoration: 'none', borderRadius: '99px'}} to={`/search/${userId}/${repoId}/${Number(page) + 1}`}>{'❱'}</Link>
          </div>
        : ''
      }
    </BasePage>
  )
}

export default SearchRepo
