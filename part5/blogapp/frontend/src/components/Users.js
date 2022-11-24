import { Table, TableBody, TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>

            <TableCell>Blog Created</TableCell>
          </TableRow>
          {users.map(user => (
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

export default Users
