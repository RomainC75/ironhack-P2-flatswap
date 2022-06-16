//this function will prevent user to input wrong data type in some field//
function validateHouseNumber(body, res) {
  let valid = true
  if (body.roomsQty === "" || isNaN(Number(body.roomsQty))) {
    res.status(400).json({
      message: `Received "${body.roomsQty}", but expected a number.`,
    })
    return (valid = false)
  } else if (body.bedroomQty === "" || isNaN(Number(body.bedroomQty))) {
    res.status(400).json({
      message: `Received "${body.bedroomQty}", but expected a number.`,
    })
    return (valid = false)
  } else if (body.surface === "" || isNaN(Number(body.surface))) {
    res.status(400).json({
      message: `Received "${body.surface}", but expected a number.`,
    })
    return (valid = false)
  }

  return valid
}

function validateString(body, res) {
  let valid = true
  if (body.street_name === "" ) {
    res.status(400).json({
      message: `Received street_name : "${body.street_name}", but expected a string.`,
    })
    return (valid = false)
  } else if (body.city === "") {
    res.status(400).json({
      message: `Received "${body.city}", but expected a string.`,
    })
    return (valid = false)
  } else if (body.country === "") {
    res.status(400).json({
      message: `Received "${body.country}", but expected a string.`,
    })
    return (valid = false)
  }
  return valid
}

module.exports = { validateHouseNumber, validateString }
