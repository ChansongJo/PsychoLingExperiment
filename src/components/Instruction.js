import React, {useState, useEffect} from 'react';
import {useForm, Controller} from "react-hook-form"
import {useHistory, useParams, Link} from "react-router-dom"
import {
    Button,
    Container,
    Form,
    Divider,
    Grid,
    Header,
    Segment,
    Input,
    Select,
    Dropdown,
    Modal
} from 'semantic-ui-react';
import Experiment from "./Experiment/Loader"
import PropTypes from "prop-types"


const ExperimentModal = ({trigger}) => {
    return (
        <Modal trigger={trigger} size='fullscreen' closeIcon>
            <Modal.Content>
                <Experiment mode='practice' />
            </Modal.Content>
        </Modal>
    );

};
ExperimentModal.propTypes = {
    openProps: PropTypes.bool
};


function Instruction() {
    const {id} = useParams()
    const [excersizeClicked, setExcersizeClicked] = useState(false)
    return (
        <div>
            <Container text style={{margin: '2em 0', fontSize: '3em'}} >

                <Segment style={{padding: '1.3em'}}>
                    <Header as={'h1'} textAlign='center'>실험 안내</Header>
                    <Header as={'h2'}>
                        연구 목적
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                본 실험은 한국어 화자가 한국어의 문장/구문을 읽으면서 반응하는 과정을 실시간으로 관찰합니다.
                            </p>
                        </Header.Subheader>
                    </Header>
                    <Header as={'h2'}>
                        실험 내용
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                            {'본 실험은 <언어 검사>와 <인지 검사>로 진행됩니다.'}<br /><br/>
                                <div className='bold'>(1) 언어 검사:</div>
                                참여자는 주어진 문장을 한 단어씩 읽으면서 반응을 합니다. <br />
                                자신의 읽기 속도에 따라 읽고, 이해되는대로 반응하십시오. <br />
                                반응한 후에는 “스페이스바”를 눌러 다음 화면을 보면 됩니다.<br /><br/>
                                <div className='bold'>(2) 인지 검사:</div>
                                실험 참여자는 안내에 따라 반응합니다. <br />
                                반응한 후에는 “스페이스바”를 눌러 검사를 완료하십시오. <br />
                            </p>
                        </Header.Subheader>
                    </Header>
                    <Header as={'h2'}>
                        실험 절차
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                <ol>
                                    <li>처음 화면에 "+" 표시가 나타납니다.</li>
                                    <li>실험을 시작할 준비가 되면, “스페이스바”를 누르십시오.</li>
                                    <li>“스페이스바”를 누를 때마다 문장 안의 단어가 하나 씩 제시됩니다. </li>
                                    <li>문장이 완성되면, 관련된 질문이 제시됩니다.  <br />
                                        답변을 선택하십시오. <br />
                                        다음 문제는 “스페이스바”를 눌러 진행하십시오. <br />
                                        (실험 문장은 총 120개입니다.) <br />
                                    </li>
                                    <li>{'<언어검사> 후에는 <인지검사>가 시작됩니다.'}</li>
                                </ol>
                            </p>
                        </Header.Subheader>
                    </Header>
                    <Header as={'h2'}>
                        연습 해보기
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                연습의 결과는 연구에 포함되지 않습니다.<br/>
                                따라서 실험 방식이 이해될 때까지 여러 번 시도해 보셔도 괜찮습니다.<br/>
                                단, 연습을 진행하지 않으면 본 실험으로 넘어갈 수 없습니다!<br />
                            </p>
                        </Header.Subheader>
                        <div style={{marginTop: '1em', display: 'flex', justifyContent: 'center'}}>
                            <ExperimentModal trigger={<Button size='huge' color='green' onClick={
                                () => setExcersizeClicked(true)
                            }>연습하기</Button>} />
                        </div>
                    </Header>
                    <Header as={'h2'}>
                        실험 시작
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                아래 버튼을 클릭하여 본 실험을 진행할 수 있습니다. <br />
                                본 실험은 대략 30 분 가량 소요되며 중간에 2번의 짧은 휴식시간이 있습니다.
                                <br />
                                <br />
                                준비가 다 되셨으면 아래 버튼을 통해 본 실험을 시작하세요.
                            </p>
                        </Header.Subheader>
                        <div style={{marginTop: '1em', display: 'flex', justifyContent: 'center'}}>
                            <Button disabled={!excersizeClicked} size='huge' primary as={Link} to={`/${id}/run`}>실험 시작하기</Button>
                        </div>
                    </Header>


                </Segment>
            </Container>
        </div >
    )
}

export default Instruction;