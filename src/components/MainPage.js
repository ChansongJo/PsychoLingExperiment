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
    Sidebar,
    Visibility,
    Modal
} from 'semantic-ui-react';
import {Link, Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import {act} from 'react-dom/test-utils';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const Homepage = ({mobile = false}) => (
    <div className='mainPage'>
        <Container text>
            <Header
                as='h1'
                content='ASK self-paced-reading Experiment'
                style={{
                    fontSize: '2.7em',
                    fontWeight: 'normal',
                    padding: '0.5em',
                    marginBottom: 0,
                    marginTop: mobile ? '1.5em' : '3em',
                    backgroundColor: '#ffffe0'
                }}
            />
            <Header
                as='h2'
                content='실험에 참가해 주셔서 감사합니다.'
                style={{
                    fontSize: mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginTop: mobile ? '0.5em' : '1.5em',
                }}
            />
            <Header
                as='h2'
                content='실험을 시작하기에 앞서 간단한 동의 절차가 필요합니다.'
                style={{
                    fontSize: mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginBottom: '1em'
                }}
            />
            <Header
                as='h2'
                content='아래 시작하기 버튼을 눌러 실험 동의서 페이지로 이동해 주세요'
                style={{
                    fontSize: mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginBottom: '1em'
                }}
            />
            <Button primary size='huge' as={Link} to={'/enroll'} floated='right'>
                시작하기
        <Icon name='right arrow' />
            </Button>
        </Container>
    </div>
);

Homepage.propTypes = {
    mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

export default Homepage;
