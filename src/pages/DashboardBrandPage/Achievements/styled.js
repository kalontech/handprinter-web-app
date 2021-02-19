import styled from 'styled-components'
import colors from 'config/colors'
import { PrimaryButton, Modal } from 'components/Styled'

export const Container = styled.div`
  display: flex;
  margin: 20px 14px;
  justify-content: center;
`

export const PopoverWrapper = styled.div`
  background-color: ${colors.dark};
  display: flex;
  flex-direction: column;
  .ant-popover-inner {
    background-color: ${colors.green} !important;
  }
  .ant-popover-inner-content {
    padding: 0;
    background-color: ${colors.green} !important;
  }
`

export const PopoverTitle = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.white};
`
export const PopoverText = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

export const AchievementImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${props =>
    props.specialShape ? '5px 5px 30px 30px' : '30px'};
  border: ${props => (props.other ? '0px' : `3px solid ${colors.green}`)};
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;
  background-color: ${props => (props.other ? colors.ocean : colors.white)};
  overflow: hidden;
  margin-top: 18px;
`

export const AchievementImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
`

export const OtherAchievementsText = styled.text`
  color: white;
  text-align: center;
  font-family: Noto Sans;
  font-size: 16px;
`

export const AchievementTitle = styled.p`
  text-align: center;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 15px;
  width: 100%;
`

export const AchievementFooter = styled.div`
  background-color: ${colors.lightGray};
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 4px 4px;
`

export const AchievementModal = styled(Modal)`
  .ant-modal-close-x {
    width: 50px;
    height: 50px;
  }

  .ant-modal-footer {
    padding: 0px;
    border: 0;
  }

  .ant-modal-body {
    height: 450px;
  }

  .ant-modal-title {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .ant-modal-header {
    border: 0px;
  }
`

export const AchievementFooterButton = styled(PrimaryButton)`
  width: 472px;
  height: 50px;
  align-self: center;
`

export const ModalContent = styled.div`
  width: 472px;
  height: 418px;
  max-height: 418px;
  overflow: scroll;
  margin: 0 60px 40px 60px;
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
  border-radius: 4px;
`
