import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'

import colors from './../../config/colors'
import PageMetadata from '../../components/PageMetadata'
import faqImg from './../../assets/faq/cat.png'
import fingerPrintleft from './../../assets/faq/fingerprint-left.png'
import fingerPrintRight from './../../assets/faq/fingerprint-right.svg'
import {
  BlockContainer,
  Collapse,
  CollapsePanel,
} from './../../components/Styled'

const Wrapper = styled.section`
  background-color: ${colors.lightGray};
  position: relative;
  :before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: url(${fingerPrintleft}) no-repeat left top,
      ${colors.ocean} url(${fingerPrintRight}) no-repeat right bottom;
    content: '';
  }
`

const Content = styled.div`
  position: relative;
  :after {
    position: absolute;
    top: 0;
    right: 40px;
    content: url(${faqImg});
  }
`

const Heading = styled.h1`
  font-size: 28px;
  line-height: 35px;
  margin-top: 40px;
  margin-bottom: 27px;
  color: ${colors.white};
`

const FaqPage = props => {
  return (
    <Fragment>
      <PageMetadata pageName="dashboardPage" />
      <Wrapper>
        <BlockContainer>
          <Row>
            <Col span={16} offset={4} gutter={20}>
              <Content>
                <Heading>
                  <FormattedMessage id="app.faqPage.title" />
                </Heading>
                <Collapse accordion defaultActiveKey={['1']} bordered={false}>
                  <CollapsePanel
                    header={props.intl.formatMessage({
                      id: 'app.faqPage.0.question',
                    })}
                    key="1"
                  >
                    <p>
                      <FormattedMessage id="app.faqPage.0.answer" />
                    </p>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.1.question" />}
                    key="2"
                  >
                    <p>
                      <FormattedMessage id="app.faqPage.1.answer" />
                    </p>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.2.question" />}
                    key="3"
                  >
                    <p>
                      <FormattedMessage id="app.faqPage.2.answer" />
                    </p>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.3.question" />}
                    key="4"
                  >
                    <p>
                      <FormattedMessage id="app.faqPage.3.answer" />
                    </p>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.4.question" />}
                    key="5"
                  >
                    <p>
                      <FormattedMessage id="app.faqPage.4.answer" />
                    </p>
                  </CollapsePanel>
                </Collapse>
              </Content>
            </Col>
          </Row>
        </BlockContainer>
      </Wrapper>
    </Fragment>
  )
}

FaqPage.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(FaqPage)
