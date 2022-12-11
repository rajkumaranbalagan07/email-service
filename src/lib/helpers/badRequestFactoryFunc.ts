import { BadRequestException, ValidationError } from "@nestjs/common";

export const transformBadrequst = (
  validationErrors: ValidationError[] = []
) => {
  const errorMessage = new BadRequestException(validationErrors);
  const errorList = (<any>errorMessage).response.message;

  (<any>errorMessage).response.message = errorMessage.message;
  (<any>errorMessage).response.error = Object.assign(
    {},
    ...parseErrorAsJOI(errorList)
  );

  return errorMessage;
};

function parseErrorAsJOI(data: any[], parsedData = []) {
  data.forEach((x) => {
    if (x.children.length !== 0) {
      parseErrorAsJOI(x.children, parsedData);
      if (!!x.constraints) {
        parsedData.push({
          [x.property]: Object.values(x.constraints)[0],
        });
      }
    } else {
      parsedData.push({ [x.property]: Object.values(x.constraints)[0] });
    }
  });
  return parsedData;
}
