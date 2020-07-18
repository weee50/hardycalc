function getInputsFrom(id)
{
  let elements = document.getElementById(id).children;
  let inputs = []
  for (let i = 0; i < elements.length; i++)
  {
    if (elements[i].nodeName == "INPUT")
    {
      inputs.push(elements[i])
    }
  }
  return inputs;
}

function getBase()
{
  return Number(document.getElementById("inputs").children[1].value)
}

function addOrd()
{
  values = [{value: 0}].concat(getInputsFrom("subOmega"));

  let inputsHTML = document.getElementById("subOmega").innerHTML.split("+");
  inputsHTML.unshift("ω<sup>" + (inputsHTML.length == 1 ? "" : inputsHTML.length) + "</sup><input type=\"number\" style=\"width: 1%\" id=\"input" + inputsHTML.length + "\">");
  document.getElementById("subOmega").innerHTML = inputsHTML.join("+");

  for (i = 0; i < values.length; i++)
  {
    document.getElementById("input" + (values.length - i - 1)).value = values[i].value;
  }
}

function removeOrd()
{
  values = getInputsFrom("subOmega");
  values.shift();

  inputsHTML = document.getElementById("subOmega").innerHTML.split("+");
  if (inputsHTML.length == 1) {return;}

  inputsHTML.shift();
  document.getElementById("subOmega").innerHTML = inputsHTML.join("+");

  for (i = 0; i < values.length; i++)
  {
    document.getElementById("input" + (values.length - i - 1)).value = values[i].value;
  }
}

function addRemoveOmegas()
{
  if (document.getElementById("omega").style.display == "inline")
  {
    document.getElementById("omega").style.display = "none";
  }
  else
  {
    document.getElementById("omega").style.display = "inline";
  }
  document.getElementById("inputOmega").value = 0;
  document.getElementById("inputOmegaPlus1").value = 0;
}

function calculate()
{
  let subOmegaNums = getInputsFrom("subOmega").map(x => +x.value).reverse();
  let omegaNums = getInputsFrom("omega").map(x => +x.value).reverse();
  let base = document.getElementById("inputBase").value;

  let text = ""
  let error = false;

  document.getElementById("shortAnswer").innerHTML = "";

  for (num of subOmegaNums.concat(omegaNums))
  {
    if (num < 0 || num % 1 != 0)
    {
      error = true;
    }
  }
  if (error)
  {
    text = "Error: Your ordinal contains negatives or decimals."
  }
  else
  {
    try
    {
      result = hardyList(subOmegaNums, omegaNums, base)
      if (result.eq(Infinity))
      {
        text = "Your result could not be displayed because it is greater than the limit of ExpantaNum.";
        error = true;
      }
      else
      {
        text = result.toString();
        notated = notate(result)
        if (text != notated)
        {
          document.getElementById("shortAnswer").innerHTML = notated;
          text = "(Unrounded: " + text + ")";
        }
      }
    }
    catch(err)
    {
      text = "Your numbers are too big! For best results, all numbers in the calculation should be less than 500.";
      error = true;
    }
  }
  
  document.getElementById("answer").innerText = text;
  if (error)
  {
    document.getElementById("answer").style.color = "red";
  }
  else
  {
    document.getElementById("answer").style.color = "white";
  }
}