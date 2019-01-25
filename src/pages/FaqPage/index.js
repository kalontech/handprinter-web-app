import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import colors from './../../config/colors'
import media from '../../utils/mediaQueryTemplate'
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
  line-height: 45px;
  margin-top: 40px;
  margin-bottom: 27px;
  color: ${colors.white};
  ${media.phone`
    visibility: hidden;
  `};
`
const Text = styled.div`
  line-height: 23px;
  br {
    display: block;
    margin-bottom: 10px;
    content: '';
  }
  ul {
    padding-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const FaqPage = props => {
  return (
    <Fragment>
      <PageMetadata pageName="dashboardPage" />
      <Wrapper>
        <BlockContainer>
          <Row>
            <Col xl={{ span: 16, offset: 4 }}>
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
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.0.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.1.question" />}
                    key="2"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.1.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.2.question" />}
                    key="3"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.2.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={
                      <FormattedMessage
                        id="app.faqPage.3.question"
                        tagName="div"
                      />
                    }
                    key="4"
                  >
                    <Text>
                      <FormattedHTMLMessage
                        id="app.faqPage.3.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.4.question" />}
                    key="5"
                  >
                    <Text>
                      <FormattedHTMLMessage
                        id="app.faqPage.4.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.5.question" />}
                    key="6"
                  >
                    <Text>
                      <FormattedHTMLMessage
                        id="app.faqPage.5.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.6.question" />}
                    key="7"
                  >
                    <Text>
                      <FormattedHTMLMessage
                        id="app.faqPage.6.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.7.question" />}
                    key="8"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.7.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.8.question" />}
                    key="9"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.8.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.9.question" />}
                    key="10"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.9.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.10.question" />}
                    key="11"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.10.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.11.question" />}
                    key="12"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.11.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.12.question" />}
                    key="13"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.12.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.13.question" />}
                    key="14"
                  >
                    <Text>
                      <FormattedHTMLMessage
                        id="app.faqPage.13.answer"
                        tagName="div"
                      />
                    </Text>
                  </CollapsePanel>
                  <CollapsePanel
                    header={<FormattedMessage id="app.faqPage.14.question" />}
                    key="15"
                  >
                    <Text>
                      <FormattedMessage
                        id="app.faqPage.14.answer"
                        tagName="div"
                      />
                    </Text>
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
