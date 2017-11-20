export default {
  loginState: state => state.loginState,
  userInfo: state => state.userInfo,
  routePath: state => state.route.fullPath,
  lessonList: state => state.channel.lessonList
}
