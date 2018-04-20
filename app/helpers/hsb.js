import moment from 'moment';

export const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let newStr = `${str} `;
    newStr = str.substr(0, len);
    newStr = str.substr(0, newStr.lastIndexOf(' '));
    newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
    return `${newStr}...`;
  }
  return str;
};

export const stripTags = input => input.replace(/<(?:.|\n)*?>/gm, '');

export const formatDate = (date, format) => moment(date).format(format);

export const select = (selected, options) => options.fn(this).replace(new RegExp(` value="${selected}"`), '$& selected="selected"').replace(new RegExp(`>${selected}</option>`), ' selected="selected"$&');

export const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
  if (storyUser === loggedUser) {
    if (floating) {
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
    }
    return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
  }
  return '';
};

