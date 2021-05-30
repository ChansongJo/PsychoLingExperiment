
export const stimuliPractice = [
  {
    answer: false,
    question: '이것은 네모입니까?',
    img: ['/static/qp1.png'],
  },
  {
    answer: true,
    question: "'아리랑' 은 한국의 노래입니까?"
  },
  {
    answer: false,
    question: "한국의 수도는 세종시입니까?"
  }
].reverse()

export const stimuli = [
  {
    answer: false,
    question: '올해는 2019년 입니까?'
  },
  {
    answer: false,
    question: '지금은 가을 입니까?'
  },
  {
    answer: false,
    question: '지금 계신 곳은 한국 입니까?'
  },
  {
    answer: true,
    question: '이것은 사과 입니까?',
    img: ['/static/q4.png']
  },
  {
    answer: false,
    question: '100에서 7을 빼면 92입니까?'
  },
  {
    answer: true,
    question: '86에서 7을 빼면 79입니까?'
  },
  {
    answer: false,
    question: '다음 그림에 주목해주시기 바랍니다.',
    img: ['/static/q7.png'],
    question_after: "방금 전 화면에서 '바다'를 보셨습니까?",
    mode: 'two-page',
  }
].reverse()
