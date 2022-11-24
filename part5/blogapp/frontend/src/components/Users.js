import { Table, TableBody, TableRow, TableCell } from '@mui/material'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initialUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = props => {
  useEffect(() => {
    props.initialUsers()
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>

            <TableCell>Blog Created</TableCell>
          </TableRow>
          {props.users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>

              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = {
  initialUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
