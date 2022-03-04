export const formatCurrency = (price, thousandSeparate = ',', floatSeparate = '.') => {  
    if ([undefined,null].includes(price)) {
      return '';
    }
  
    if (!['number', 'string'].includes(typeof price)) {
      return price;
    }
  
    const arr = (price + '').split('.');
  
    return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparate}`) + (arr[1] ? floatSeparate + arr[1] : '');
}
