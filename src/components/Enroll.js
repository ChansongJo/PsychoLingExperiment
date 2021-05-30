import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useHistory } from "react-router-dom"
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
    Dropdown
} from 'semantic-ui-react';
import { postUserData } from "../api"
import { SubjectModel } from "../models/Subject"

const gender_options = [
    { key: 'm', text: '남성', value: 'm' },
    { key: 'f', text: '여성', value: 'f' },
    { key: 'o', text: '기타', value: 'o' },
]

const academic_options = [
    { key: 'e', text: '초등학교', value: 'elementary' },
    { key: 'm', text: '중학교', value: 'middle' },
    { key: 'h', text: '고등학교', value: 'high' },
    { key: 'b', text: '대학교', value: 'bachelor' },
    { key: 'a', text: '석사', value: 'master' },
    { key: 'd', text: '박사', value: 'doctor' },
]


const academic_status = [
    { key: 'q', text: '재학', value: 'ongoing' },
    { key: 'e', text: '졸업', value: 'graduate' },
    { key: 'f', text: '기타', value: 'other' },
]


const foreign_options_duration = [
    { key: 'q', text: '없음', value: 'no' },
    { key: 'e', text: '2년 미만', value: '2-' },
    { key: 'f', text: '2년 이상 3년 미만', value: '2+' },
    { key: 'k', text: '3년 이상', value: '3+' },
]

const Enroll = () => {
    const { control, handleSubmit, reset, errors, setValue, register, getValues } = useForm()
    const [renderQ, setRenderQ] = useState(false)
    const history = useHistory()

    const onSubmit = async (data) => {
        const payload = new SubjectModel(data).payload
        console.log('data', data)
        await postUserData(payload).then(
            res => {
                console.log(res)

                alert(`실험 세션이 성공적으로 생성되었습니다. <${res.data.session_id}>`)
                // 링크 이동
                history.push(`/${res.data.session_id}/recog`)
            }

        ).catch(e => {
            alert('문제가 발생했습니다. \n 다시 시도해도 문제가 지속해서 발생하면 관리자에게 문의해주세요!')
        })
        return null
    }

    const errorHandler = (error) => {
        if (error !== undefined) {
            switch (error.type) {
                case "pattern":
                    return "형식이 올바르지 않습니다."
                case "required":
                    return "이 필드는 필수입니다."
                default:
                    return "값이 올바르지 않습니다."
            }
        } else {
            return false
        }
    }

    const nameDoubleCheck = () => {
        const { name, name_check } = getValues(["name", "name_check"]);
        if (name_check !== undefined && name !== name_check) {
            return "위의 '이름' 필드와 이름이 일치하지 않습니다."
        } else {
            return false
        }
    }

    const handleChange = ({ value }, key) => {
        setRenderQ(!renderQ)
        setValue(key, value);
    }


    useEffect(
        () => {
            console.log(getValues('foreign_experience'))
            console.log('curr_val', getValues())
            console.log('errors', errors)
        }, [renderQ]
    )
    return (
        <Container text style={{ margin: '2em 0', fontSize: '3em' }} >
            <Segment style={{ padding: '1.3em' }}>
                <Header as={'h1'}>
                    실험 참가 동의서
                    <Header.Subheader style={{ marginTop: '0.3em', }}>
                        언어 연구
                        <p style={{ marginTop: '0.8em' }}>
                            제공하신 정보는 연구목적 이외에는 사용되지 않습니다. <br />
                          아래의 정보는 보호 받을 것이며 어떠한 논문에서도 익명으로 사용됩니다.
                       </p>
                    </Header.Subheader>
                </Header>

                <Divider style={{ margin: '2em' }} />
                <Header>참가자 정보</Header>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group widths={'equal'} fluid>
                        <Controller
                            as={<Form.Input placeholder='홍길동' label='이름' error={errorHandler(errors.name)} />}
                            control={control}
                            rules={{ required: true }}
                            name='name' />
                        <Controller
                            as={<Form.Input placeholder='1996-01-01' label='생년월일' error={errorHandler(errors.birthdate)} />}
                            control={control}
                            rules={{
                                required: true,
                                pattern: /\d{4}-\d{2}-\d{2}/
                            }}
                            name='birthdate' />
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='gender'
                            render={({ onChange, onBlur, value }) => (
                                <Form.Select
                                    label='성별'
                                    onChange={(e, data) => handleChange(data, 'gender')}
                                    onBlur={onBlur}
                                    selected={value}
                                    options={gender_options}
                                    error={errorHandler(errors.gender)}
                                />
                            )} />

                    </Form.Group>
                    <Form.Group widths={'equal'} fluid>
                        <Controller
                            as={<Form.Input placeholder='hong@gmail.com' label='이메일' error={errorHandler(errors.email)} />}
                            control={control}
                            rules={{
                                required: true,
                                pattern: /[.+[@].+[.].+/
                            }}
                            name='email' />
                    </Form.Group>

                    <Form.Group inline widths='equal'>
                        <label>학력사항</label>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='academic_degree'
                            render={({ onChange, onBlur, value }) => (
                                <Form.Select
                                    placeholder='최종학력'
                                    width={1}
                                    onChange={(e, data) => handleChange(data, 'academic_degree')}
                                    onBlur={onBlur}
                                    selected={value}
                                    options={academic_options}
                                    error={errorHandler(errors.academic_degree)}
                                />
                            )} />
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='academic_status'
                            render={({ onChange, onBlur, value }) => (
                                <Form.Select
                                    placeholder='상태'
                                    width={1}
                                    onChange={(e, data) => handleChange(data, 'academic_status')}
                                    onBlur={onBlur}
                                    selected={value}
                                    options={academic_status}
                                    error={errorHandler(errors.academic_status)}
                                />
                            )} />


                        <Controller
                            as={<Form.Input placeholder='전공' width={1} disabled={['high', 'elementary', 'middle'].includes(getValues('academic_degree'))} error={errorHandler(errors.academic_major)} />}
                            control={control}
                            rules={{ required: !['high', 'elementary', 'middle'].includes(getValues('academic_degree')) }}
                            name='academic_major' />

                    </Form.Group>
                    <Form.Group inline fluid>
                        <label>해외 거주 경험</label>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='foreign_experience_duration'
                            render={({ onChange, onBlur, value }) => (
                                <Form.Select
                                    placeholder='해외 체류 경험'
                                    onChange={(e, data) => {
                                        handleChange(data, 'foreign_experience_duration')
                                    }}
                                    onBlur={onBlur}
                                    selected={value}
                                    options={foreign_options_duration}
                                    error={errorHandler(errors.foreign_experience)}
                                />
                            )} />
                        <Controller
                            as={<Form.Input placeholder='출국 연령 (만)'
                                disabled={!["2+", "3+"].includes(getValues('foreign_experience_duration'))}
                                error={errorHandler(errors.foreign_experience_age)} />}
                            control={control}
                            rules={{
                                required: ["2+", "3+"].includes(getValues('foreign_experience_duration')),
                                pattern: (["2+", "3+"].includes(getValues('foreign_experience_duration'))) ? /[0-9]+/ : /.?/
                            }}
                            name='foreign_experience_age' />
                        <Controller
                            as={<Form.Input placeholder='국가' disabled={!["2+", "3+"].includes(getValues('foreign_experience_duration'))} error={errorHandler(errors.foreign_experience_country)} />}
                            control={control}
                            rules={{
                                required: ["2+", "3+"].includes(getValues('foreign_experience_duration'))
                            }}
                            name='foreign_experience_country' />
                    </Form.Group>
                    <Form.Group inline fluid>
                        <label>모국어</label>
                        <Controller
                            as={<Form.Input placeholder='예) 한국어' error={errorHandler(errors.foreign_experience_country)} />}
                            control={control}
                            rules={{
                                required: true
                            }}
                            name='mother_tongue' />
                    </Form.Group>
                    <Divider style={{ margin: '2em' }} />
                    <Header as={'h3'}>실험 동의</Header>
                    <Form.Group inline fluid>
                        <Grid celled>
                            <Container text style={{ margin: '1.5em 3em', fontSize: '1.1em', textAlign: 'justify' }}>
                                본인은 동의서를 모두 읽었으며, 본 연구를 충분히 이해하였고, <br /><br />
                                본인이 원하면 언제든지 실험을 포기할 수 있음을 알고 있습니다. <br /><br />
                                본인은 본 연구 및 동의서가 본인의 어떤 법적 권리도 침해하지 않음을 알고 있습니다. <br /><br />
                                어떤 연구책임자, 연구기관, 연구원도 이를 소홀히 했을 경우,  <br /><br />
                                책임으로부터 자유롭지 않음을 알고 있습니다. <br /><br />
                                본인은 이 연구에 참가함에 동의합니다. <br /><br />
                                실험 사례비로 문화상품권 10,000원이 지급될 예정임을 확인하였고,  <br /><br />
                                이에 동의합니다.  <br />
                            </Container>
                        </Grid>
                    </Form.Group>
                    <Grid >
                        <Grid.Row columns={4} style={{ marginBottop: '3em', padding: '2em' }}>
                            <Grid.Column width={1}>
                                <h3>나</h3>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Controller as={
                                    <Form.Input placeholder={""} transparent style={{
                                        borderBottom: '0.1em solid',
                                        fontSize: '1.4em',
                                    }}
                                        error={errorHandler(errors.name_check)} />}
                                    rules={{ required: true }}
                                    name='name_check'
                                    control={control} />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <h3>은/는 실험 참가에 동의함.</h3>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right'>
                                <Button primary type="submit" onClick={handleSubmit(onSubmit)}>제출</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                <Divider style={{ margin: '2em' }} />
                <Container text textAlign='left' style={{ fontSize: 'small', color: 'grey' }}>
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
                                {' '}한국학중앙연구원 (2019.2-2021.2) <br />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </Container >
    )
}

export default Enroll