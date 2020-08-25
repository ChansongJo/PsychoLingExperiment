import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Visibility,
    Modal,
    Confirm
} from 'semantic-ui-react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import "./MainPage.css"

import {act} from 'react-dom/test-utils';
import {get, findLastIndex} from 'lodash';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



const Body = ({mobile = false}) => (

    <Segment vertical style={{padding: '0em 0em'}}>

        <Grid divided stackable>
            <Grid.Row>
                <Grid.Column>
                    <div class="imageContainer alignItemCenter">
                        <div class="imageCover" />
                        <div class="studyTitle">
                            온라인 언어실험 참여 페이지
                            </div>
                        <div class="logo">
                            <Image src="/static/logo_white.png" />
                        </div>
                        <div class="studyDetail centered">
                            실험 기간 | 2020.08.27 ~ 2020.09.30 <br />
                    문의 사항 | 염희선 / heesunyeom@gmail.com
                    </div>
                    </div>

                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column verticalAlign='middle' textAlign='center'>
                    <div class="mainContent">
                        <p>
                            실험에 참가해주셔서 감사합니다. <br />
                                실험에 시작하기에 앞서 간단한 동의절차가 필요합니다.<br />
                                아래 시작하기 버튼을 눌러 실험 동의서 페이지로 이동해 주세요. <br />
                        </p>
                        <br />
                    </div>
                    <Button as={Link} to="/enroll" size='huge' primary >
                        시작하기
                    </Button>

                </Grid.Column>
            </Grid.Row>
        </Grid>
    </ Segment>

);

Body.propTypes = {
    mobile: PropTypes.bool,
};


const DesktopContainer = ({children}) => (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>

        {children}
    </Responsive>
)
const MobileContainer = ({children}) => (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth} >

        <Container text>
            <Segment style={{display: 'flex', margin: '30vh 2rem', justifyContent: 'center', verticalAlign: 'middle'}} >
                <Header as='h1'>
                    본 페이지는 모바일 환경을 지원하지 않습니다. <br />
                PC 환경에서 접속해주세요.
                </Header>
            </Segment>

        </Container>
    </Responsive>
)



const ResponsiveContainer = ({children}) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

const Homepage = () => (
    <ResponsiveContainer>
        <Body />

    </ResponsiveContainer>
)

export default Homepage;
