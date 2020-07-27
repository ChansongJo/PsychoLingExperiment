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
    Modal
} from 'semantic-ui-react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import "./MainPage.css"

import {act} from 'react-dom/test-utils';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
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
                            실험 기간 | 2020.07.15 ~ 2020.08.15 <br />
                    문의 사항 | 염희선 / duagmltjs@sogang.ac.kr (수정예정)
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





const ResponsiveContainer = ({children}) => (
    <div>
        <Responsive>{children}</Responsive>
    </div>
)

const Homepage = () => (
    <ResponsiveContainer>
        <Body />

    </ResponsiveContainer>
)

export default Homepage;
