import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Menu = ({ name, logout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <MenuContainer>
      <Link style={padding} to='/blogs'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      <>
        {name} logged in
        <button onClick={logout}>logout</button>
      </>
    </MenuContainer>
  )
}
const MenuContainer = styled.div`
  background: #c0c0c0;
`

export default Menu
