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
                        실험 설계
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                본 실험은 두 단계로 나누어져 있습니다.<br />
                                <br />
                                첫번째 단계에서, 실험 참여자는 주어진 문장을 읽으면서 반응을 합니다. <br />
                                이 실험은 참여자의 한국어 문법 능력을 평가하기 위한 검사가 아닙니다. <br />
                                따라서, 각 문항에는 정답이 정해져 있지 않으므로 본인의 판단에 의해 반응하면 됩니다. <br />
                                제시된 읽기 자료들이 이해 되는대로 반응하고, 반응한 후에는 “SPACE BAR”를 눌러 다음 화면을 보면 됩니다.<br />
                                <br />
                                두번째 단계에서, 실험 참여자는 인지능력 검사를 진행합니다. <br />
                                이 검사는 참여자의 지적 능력을 평가하기 위한 검사가 아닙니다. <br />
                                안내에 따라 반응하고, 반응한 후에는 “SPACE BAR”를 눌러 검사를 완료해주시기 바랍니다.<br />
                            </p>
                        </Header.Subheader>
                    </Header>
                    <Header as={'h2'}>
                        실험 절차
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                <ol>
                                    <li>처음 화면에 "+" 표시가 나타납니다.</li>
                                    <li>잠시 후 화면이 바뀌면 빈 문장이 나타납니다.</li>
                                    <li>실험을 시작할 준비가 되면, “SPACE BAR” 를 누르십시오.</li>
                                    <li>“SPACE BAR”를 누를 때마다 문장 안의 단어가 하나 씩 제시됩니다. </li>
                                    <li>문장이 완전히 제시된 이후에는 관련된 질문이 제시됩니다.  <br />
                                        답변을 선택한 후, 반응하십시오. 	 <br />
                                        반응 후에는 “SPACE BAR”를 눌러 다음 문장으로 진행하십시오.<br />
                                        (실험 문장은 총 120개임.) <br />
                                    </li>

                                    <li>문장 읽기의 첫번째 과제를 마친 후 두번째 단계에서는 인지능력 검사를 실시합니다.</li>
                                    <li>주어진 안내에 따라 마우스로 화면에 나타나는 상자를 선택해 주십시오.</li>
                                    <li>선택을 완료한 후에는 완료 버튼을 눌러 종료할 수 있습니다.</li>

                                    <li> 본 과제는 기억력이나 지능을 측정하는 검사가 아닙니다.  <br />
                                        생각나는 대로 응답 하십시오.</li>
                                </ol>
                            </p>
                        </Header.Subheader>
                    </Header>
                    <Header as={'h2'}>
                        연습 해보기
                        <Header.Subheader style={{marginTop: '1em'}}>
                            <p style={{lineHeight: '1.5em', fontSize: '1.2rem', padding: '0 1em'}}>
                                아래 버튼을 클릭하여 실험 연습을 진행해 보세요. 연습 결과는 실험 결과에 포함되지 않으므로 실험 방식이 이해될 때까지 여러번 시도해 보셔도 괜찮습니다. <br />
                                <br />
                                연습을 진행하지 않으면 본 실험으로 넘어갈 수 없습니다!<br />
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
                                본 실험은 대략 30 분 가량 소요되며 중간에 자리를 비우실 수 없습니다.
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