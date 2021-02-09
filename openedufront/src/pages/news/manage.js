import {month} from '../../helpers/utils'

export const manageText = (text) => {
  if (text.length > 160) {
	text = text.substring(0, 150)
    return text + '...';
  } else {
    return text
  }
}

export const manageBigText = (text) => {
  if (text.length > 300) {
    text = text.substring(0, 300)
    return text + '...';
  } else {
    return text
  }
}

export const manageTitle = (name) => {
  if (name.length > 50) {
	name = name.substring(0, 50)
    return name + '...';
  } else {
    return name
  }
}

export const manageDate = (creation_date) => {
  creation_date = creation_date.split('-').map(Number)
  return [creation_date[2], String(month[creation_date[1]]).substring(0, 3)]
}