import { faker } from "@faker-js/faker/locale/id_ID";
import dayjs from "dayjs";

const fakeIt = (key) => {
  switch (key) {
    case "int":
      return faker.number.int(100);
    case "string":
      return faker.lorem.sentence();
    case "desc":
      return faker.lorem.sentences();
    case "img":
      return faker.image.urlPicsumPhotos();
    case "name":
      return faker.person.fullName();
    case "phone":
      return faker.phone.number();
    case "date":
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    case "time":
      return dayjs().format("HH:mm");
    default:
      return "";
  }
};

export const createDataFaker = (jsonData) => {
  const dataLen = jsonData.len;
  const data = jsonData.data;

  let result;
  if (dataLen > 1) {
    result = [];
    for (var i = 0; i < dataLen; i++) {
      let tmp = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const field = key;
          const val = data[key];
          if (typeof val === "string") {
            tmp[field] = fakeIt(val);
          } else {
            tmp[field] = createDataFaker(val);
          }
        }
      }
      result.push(tmp);
    }
  } else {
    result = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const field = key;
        const val = data[key];
        if (typeof val === "string") {
          result[field] = fakeIt(val);
        } else {
          result[field] = createDataFaker(val);
        }
      }
    }
  }
  return result;
};
