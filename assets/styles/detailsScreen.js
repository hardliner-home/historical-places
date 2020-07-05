import { colors } from './colors'

const style = {
  container : {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 15,
    paddingRight: 15,
  },
  viewPager: {
    height: 200,
  },
  placeName: {
    marginTop: 20,
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '500',
    color: colors.mainGrey,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.mainGrey,
  },
  readMore: {
    fontSize: 16,
    marginTop: 12,
    color: colors.mainGreen,
    textDecorationLine: 'underline'
  },
  separator: {
    borderColor: '#293845', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    marginBottom: 20,
    marginTop: 20,
  },
  showComments: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.mainGreen,
  },
  showCommentsText: {
    alignSelf: 'center',
    fontSize: 18,
    color: colors.white,
  }, 
}

export { style }