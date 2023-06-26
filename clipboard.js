const copyTextBtn = document.getElementById("copyText");
const copyTextImageBtn = document.getElementById("copyImage");

copyTextBtn.addEventListener("click", () => {
  copyText();
});
copyTextImageBtn.addEventListener("click", () => {
  copyImage();
});

if (!("write" in navigator.clipboard)) {
  document.getElementById("clipboardNotSupported").style.display = "block";
}

async function copyImage() {
  if ("write" in navigator.clipboard) {
    try {
      const file = await (await fetch("coffee.png")).blob();
      const data = [new ClipboardItem({ [file.type]: file })];
      await navigator.clipboard.write(data);
      copyTextImageBtn.innerHTML = "<span>👌</span> Copied!";

      document.getElementById("log").innerHTML = "";
    } catch (err) {
      copyTextImageBtn.innerHTML = "<span>😭</span> Error copying image";

      console.error("Failed to copy image: ", err);
      document.getElementById("log").innerHTML = JSON.stringify(err);
    }
  } else {
    copyTextImageBtn.innerHTML = "<span>😭</span> ClipboardItem not supported";
  }

  setTimeout(() => {
    copyTextImageBtn.innerHTML =
      "<span>📋</span> Copy the picture to your clipboard";
  }, 3000);
}

async function copyText() {
  const text = document.getElementById("text");

  try {
    await navigator.clipboard.writeText(text.value);
    copyTextBtn.innerHTML = "<span>👌</span> Copied!";
    document.getElementById("textPaste").value = "";
    document.getElementById("log").innerHTML = "";
  } catch (err) {
    copyTextBtn.innerHTML = "<span>😭</span> Error copying text";
    console.error("Failed to copy: ", err);
    document.getElementById("log").innerHTML = JSON.stringify(err);
  }

  setTimeout(() => {
    copyTextBtn.innerHTML = "<span>📋</span> Copy the text to your clipboard";
  }, 3000);
}
