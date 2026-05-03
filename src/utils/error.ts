export const extractErrorMessage = (error: any, defaultMessage: string = 'Đã xảy ra lỗi'): string => {
  if (error?.response?.data?.error) {
    const errData = error.response.data.error;
    if (errData.details && Array.isArray(errData.details)) {
      return errData.details.map((d: any) => d.message).join(', ');
    }
    if (errData.message) {
      return errData.message;
    }
    return String(errData);
  }
  return error?.message || defaultMessage;
};
