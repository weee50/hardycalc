function notate(num)
{
  if (num.lt(1e6))
  {
    return num.toString();
  }
  else if (num.lt("e1e6"))
  {
    let exponent = num.log10().floor();
    let mantissa = ExpantaNum.pow(10, num.log10().mod(1));

    return mantissa.toPrecision(8) + "e" + exponent; 
  }
  else if (num.lt("10^^6"))
  {
    return "e" + notate(num.log10());
  }
  else
  {
    return num.toString();
  }
}