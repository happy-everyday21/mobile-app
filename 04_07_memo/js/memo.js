"use strict";

window.addEventListener("DOMContentLoaded",
  function () {
    if (typeof localStorage === "undefined") {
      window.alert("このブラウザは localStorage 機能が実装されていません");
      return;
    } else {
      viewStorage();
      saveLocalStorage();
      selectTable();
      delLocalStorage();
      allClearLocalStorage();
    }
  }
);

function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      if (key == "" || value == "") {
        window.alert("Key または Memo が必須です");

      } else {
        let w_confirm = confirm(
          "このページの内容\n +LocalStorageに\n" + "[" + key + "] [" + value + "]\n" + "を保存(save)しますか?");
        if (w_confirm !== true) return;

        localStorage.setItem(key, value);
        viewStorage();
        const w_msg = "LocalStorageに " + key + " " + value + " を保存しました";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
        $("#table1").trigger("update");
      }
    }, false
  );
}

function viewStorage() {
  const list = document.getElementById("list");

  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.textContent = w_key;
    td3.textContent = localStorage.getItem(w_key);
  }

  $(function () {
    $("#table1").tablesorter({
      sortList: [[1, 0]]
    });
  });

  $("#table1").trigger("update");

}

function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click", function (e) {
    e.preventDefault();
    selectCheckBox();
  }, false);
}

function selectCheckBox() {
  let w_cnt = 0;  // ← 修正
  let w_sel = "0";
  let w_textKey = "";
  let w_textMemo = "";
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {

      if (w_cnt === 0) {
        // ★ 正しくセルのテキストを取得
        w_textKey = table1.rows[i + 1].cells[1].textContent;
        w_textMemo = table1.rows[i + 1].cells[2].textContent;
      }
      w_cnt++;
    }
  }

  // ★ getElementsByName は配列 → getElementById に修正
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;

  if (w_cnt === 1) {
    return "1";
  } else {
    window.alert("1つ選択(Select)してください。");
    return "0";
  }
}

function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
    function (e) {
      e.preventDefault();

      let w_sel = selectCheckBox();

      if (w_sel === "1") {
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        let w_confirm = confirm(
          "このページの内容\nLocalStorageから\n[" + key + "] [" + value + "]\nを削除(delete)します ? "
        );

        // ★ 修正: 条件式が間違っていた
        if (w_confirm !== true) return;

        localStorage.removeItem(key);

        let w_msg = "LocalStorageから " + key + " のデータを削除(delete)しました。";
        window.alert(w_msg);

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
        viewStorage();
      }
    }, false);

}

function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");

  allClear.addEventListener("click", function (e) {
    e.preventDefault();

    let w_confirm = confirm("LocalStorageのデータをすべて削除 (all clear) します。\nよろしいですか?");

    if (w_confirm === true) {
      localStorage.clear();

      let w_msg = "LocalStorageのデータをすべて削除 (all clear)しました。";
      window.alert(w_msg);

      document.getElementById("textKey").value = "";
      document.getElementById("textMemo").value = "";

      viewStorage();

      $("#table1").tablesorter({
        sortlist: [[1, 0]]
      });
      $("#table1").trigger("update");

    }
  }, false);
}
