import styled from 'styled-components'
import colors from 'config/colors'

export const Container = styled.div`
  height: 160px;
  background-color: #169080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Avatar = styled.img`
  height: 130px
  width: 130px
  border-radius: 65px;
  margin-left: 50px;
`

export const AvatarOrg = styled.img`
  height: 152px;
  width: 152px;
  border-radius: 76px;
  border: 3px solid ${colors.green};
`

export const Banner = styled.div`
  background-image: ${props => props.image && `url(${props.image})`};
  background-size: cover;
  background-position: center center;
  resize-mode: contain;
  height: 100%;
  width: 350px;
  padding-right: 100px;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`
