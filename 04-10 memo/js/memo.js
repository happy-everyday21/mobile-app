"use strict";

// ページ読み込み時に実行
window.addEventListener("DOMContentLoaded", function () {

  if (typeof localStorage === "undefined") {
    swal({
      title: "Memo app",
      text: "このブラウザはLocal Storage機能が実装されていません",
      type: "error"
    });
    return;
  } else {
    viewStorage();
    saveLocalStorage();
    delLocalStorage();
    allClearLocalStorage();
    selectTable();
  }
}, false);


// 2. localStorageへ保存
function saveLocalStorage() {
  const save = document.getElementById("save");

  save.addEventListener("click", function (e) {
    e.preventDefault();

    const key = document.getElementById("textKey").value;
    const value = document.getElementById("textMemo").value;

    if (key === "" || value === "") {
      swal({
        title: "Memo app",
        text: "Key、Memoはいずれも必須です。",
        type: "error"
      });
      return;
    }

    swal({
      title: "Memo app",
      text: "LocalStorageに\n" + "「" + key + " " + value + "」" + "\nを保存しますか？",
      type: "question",
      showCancelButton: true
    }).then(function (result) {

      if (result.value) {

        localStorage.setItem(key, value);
        viewStorage();

        swal({
          title: "Memo app",
          text: "LocalStorageに\n" + key + " " + value + "\n保存しました。",
          type: "success"
        });

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });

  }, false);
}


// 3. 削除（チェックボックス）
function delLocalStorage() {
  const del = document.getElementById("del");

  del.addEventListener("click", function (e) {
    e.preventDefault();

    const chkbox1 = document.getElementsByName("chkbox1");
    let w_sel = selectCheckBox("del");

    if (w_sel >= 1) {

      swal({
        title: "Memo app",
        text: "LocalStorageから " + w_sel + " 件を削除しますか？",
        type: "question",
        showCancelButton: true
      }).then(function (result) {

        if (result.value) {

          for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
              let tr = chkbox1[i].closest("tr");
              let key = tr.cells[1].textContent;
              localStorage.removeItem(key);
            }
          }

          viewStorage();

          swal({
            title: "Memo app",
            text: "LocalStorageから " + w_sel + "件を削除しました。",
            type: "success"
          });

          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      });
    }
  }, false);
}


// 4. 選択ボタン
function selectTable() {
  document.getElementById("select").addEventListener("click", function (e) {
    e.preventDefault();
    selectCheckBox("select");
  }, false);
}


// 5. チェック処理
function selectCheckBox(mode) {

  const chkbox1 = document.getElementsByName("chkbox1");
  let w_cnt = 0;

  let w_key = "";
  let w_memo = "";

  for (let i = 0; i < chkbox1.length; i++) {

    if (chkbox1[i].checked) {

      if (w_cnt === 0) {
        let tr = chkbox1[i].closest("tr");
        w_key = tr.cells[1].textContent;
        w_memo = tr.cells[2].textContent;

        document.getElementById("textKey").value = w_key;
        document.getElementById("textMemo").value = w_memo;
      }
      w_cnt++;
    }
  }

  if (mode === "del" && w_cnt === 0) {
    swal({
      title: "Memo app",
      text: "1つ以上選択してください。",
      type: "error"
    });
    return 0;
  }

  if (mode === "select" && w_cnt !== 1) {
    swal({
      title: "Memo app",
      text: "1つだけ選択してください。",
      type: "error"
    });
    return 0;
  }

  return w_cnt;
}


// 6. 表示（★×アイコン追加）
function viewStorage() {
  const list = document.getElementById("list");

  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i++) {

    let w_key = localStorage.key(i);

    let tr = document.createElement("tr");
    tr.innerHTML =
      "<td><input name='chkbox1' type='checkbox'></td>" +
      "<td>" + w_key + "</td>" +
      "<td>" + localStorage.getItem(w_key) + "</td>" +
      '<td><img src="img/trash.png" class="trash" alt="削除" title="この行を削除" style="cursor:pointer; width:20px;"></td>';
    list.appendChild(tr);
  }

  $("#table1").tablesorter({ sortList: [[1, 0]] });
  $("#table1").trigger("update");
}


// 7. 全削除
function allClearLocalStorage() {
  document.getElementById("allClear").addEventListener("click", function (e) {
    e.preventDefault();

    swal({
      title: "Memo app",
      text: "LocalStorageのデータをすべて削除しますか？",
      type: "question",
      showCancelButton: true
    }).then(function (result) {

      if (result.value) {

        localStorage.clear();
        viewStorage();

        swal({
          title: "Memo app",
          text: "すべて削除しました。",
          type: "success"
        });

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });
  }, false);
}


// 8. ×クリック削除（Event Delegation）
document.getElementById("table1").addEventListener("click", function (e) {

  if (e.target.classList.contains("trash")) {

    let tr = e.target.closest("tr");
    let key = tr.cells[1].textContent;
    const value = tr.cells[2].textContent;


    swal({
      title: "Memo app",
      text: "LocalStorageから「" + key + " " + value + "」削除しますか？",
      type: "question",
      showCancelButton: true
    }).then(function (result) {

      if (result.value) {
        localStorage.removeItem(key);
        viewStorage();

        swal({
          title: "Memo app",
          text: "LocalStorageから「" + key + " " + value + "」削除しました。",
          type: "success"
        });
      }
    });
  }
});
