/* Šifra vše pozpátku */
document.getElementById("button_1").onclick = () => {
  let val = document.getElementById("input_1").value
  val = val.split("").reverse().join("")
  document.getElementById("output_1").innerHTML = val
}

/* Šifra slova pozpátku */
document.getElementById("button_2").onclick = () => {
  let val = document.getElementById("input_2").value
  val = val
    .split(" ")
    .map((s) => s.split("").reverse().join(""))
    .join(" ")
  document.getElementById("output_2").innerHTML = val
}

/* Caesarova šifra */
document.getElementById("button_3").onclick = () => {
  let val = document.getElementById("input_3").value
  val = val.replace(/[a-zA-Z]/g, function (c) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 3) ? c : c - 26
    )
  })
  document.getElementById("output_3").innerHTML = val
}
