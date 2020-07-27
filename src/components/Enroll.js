import React, {useState} from 'react';
import {
    Button,
    Container,
    Form,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Input,
    Select,
    Radio,
    Sidebar,
    Visibility,
    Modal,
    Dropdown
} from 'semantic-ui-react';

const gender_options = [
    {key: 'm', text: '남성', value: 'm'},
    {key: 'f', text: '여성', value: 'f'},
    {key: 'o', text: '기타', value: 'o'},
]

const academic_options = [
    {key: 'q', text: '고등학교', value: 'hs'},
    {key: 'e', text: '대학교', value: 'b'},
    {key: 'r', text: '석사', value: 'm'},
    {key: 'r', text: '박사', value: 'd'},
]


const academic_status = [
    {key: 'q', text: '재학', value: '재학'},
    {key: 'e', text: '졸업', value: '졸업'},
    {key: 'f', text: '기타', value: '기타'},
]

const foreign_options = [
    {key: 'q', text: '없음', value: 'no'},
    {key: 'e', text: '1년 미만', value: 'less_1year'},
    {key: 'f', text: '1년 이상', value: 'more_1year'},
]
const Enroll = () => {
    return (
        <Container text style={{marginTop: '2em', fontSize: 'large', backgroudImage: "file://./build/img1.jpg"}}>
            <Segment style={{padding: '1em'}}>
                <Header as={'h1'}>
                    실험 참가 동의서
                    <Header.Subheader style={{marginTop: '0.3em', }}>
                        언어 연구
                        <p style={{marginTop: '0.8em'}}>
                            제공하신 정보는 연구목적 이외에는 사용되지 않습니다. <br />
                          아래의 정보는 보호 받을 것이며 어떠한 논문에서도 익명으로 사용됩니다.
                       </p>
                    </Header.Subheader>
                </Header>

                <Divider style={{margin: '1em'}} />
                <Header>참가자 정보</Header>
                <Form>

                    <Form.Group widths={'equal'} fluid>
                        <Form.Input placeholder='홍길동' label='이름' />
                        <Form.Input placeholder='930101' label='생년월일' />
                        <Form.Field
                            control={Select}
                            label='성별'
                            options={gender_options}
                        />
                    </Form.Group>

                    <Form.Group widths={'equal'} fluid>

                    </Form.Group>


                    <Form.Group inline fluid>
                        <label>학력사항</label>
                        <Form.Field
                            control={Select}
                            options={academic_options}
                            placeholder={'최종학력'}
                        />
                        <Form.Field
                            control={Select}
                            options={academic_status}
                            placeholder={'상태'}

                        />
                        <Form.Input placeholder='전공'>

                        </Form.Input>
                    </Form.Group>
                    <Form.Group inline fluid>
                        <label>해외 거주 경험</label>
                        <Form.Field
                            control={Select}
                            options={foreign_options}
                            placeholder={'해외 체류 경험'}
                        />
                    </Form.Group>
                    <Header as={'h3'}>실험 동의</Header>
                    <Form.Group inline fluid>

                        <Grid celled>
                            <Container text style={{margin: '1.5em'}}>

                                본인은 본 동의서를 모두 읽었고 이해했으며, 본 연구에 관한 충분한 설명을 들었고, 본인의 실험포기가 언제든지 가능하다는 설명도 들었습니다.<br /><br />

                                본인은 이 연구/실험을 충분히 이해하고, 이 동의서가 본인의 어떠한 법적 권리도 침해하지 않으며, 연구책임자 혹은 연구기관 혹은 어떠한 연구원도 이를 소홀히 한 책임으로부터 자유롭지 않음을 이해하여 이 연구에 참가함을 동의합니다. 또한, 실험 사례비(문화상품권 10000원)을 받았음을 확인합니다.

                                </Container>

                        </Grid>
                    </Form.Group>


                    <Grid >
                        <Grid.Row columns={4} style={{marginBottop: '3em'}}>
                            <Grid.Column width={2}>
                                <h3>나</h3>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input placeholder='홍길동' transparent />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <h3>은/는 실험 참가에 동의함.</h3>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                                <Button primary type="submit">제출</Button>

                            </Grid.Column>
                        </Grid.Row>

                    </Grid>


                </Form>
            </Segment >
            <Segment>
                <Container text textAlign='left' style={{fontSize: 'small', color: 'grey'}}>
                    <h4>연구 책임</h4>

                    <Grid>
                        <Grid.Row fluid columns={2}>
                            <Grid.Column width={2}>
                                연구 팀장: <br />
                                연구원: <br />
                                <br />
                                연구 지원:
                            </Grid.Column>
                            <Grid.Column width={12}>
                                Seckin Arslan (Université Côte d'Azur, France)<br />
                                {' '}김세영 (한양대), 이미선 (한양대), 이선영 (사이버한국외대), 조숙환 (서강대) <br />
                                {' '}염희선 (서강대), 이수미 (서강대), 조찬송 (Naver) <br />

                    연구지원: 한국학중앙연구원 (2019.2-2021.2) <br />

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>


                </Container>
            </Segment>
        </Container >
    )
}

export default Enroll