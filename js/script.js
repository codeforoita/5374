"use strict";

/**
  エリア(ごみ処理の地域）を管理するクラスです。
  大分バージョンでは自治区を示すクラスです。
*/
var AreaModel = function () {
  this.label;
  this.centerName;
  this.center;
  this.trash = new Array();
  /**
  各ゴミのカテゴリに対して、最も直近の日付を計算します。
  */
  this.calcMostRect = function () {
    for (var i = 0; i < this.trash.length; i++) {
      //this.trash[i].calcMostRect(this);
      this.trash[i].calcMostRect();
    }
  }
  /**
    休止期間（主に年末年始）かどうかを判定します。
  */
  this.isBlankDay = function (currentDate) {
    if (!this.center) {
      return false;
    }
    var period = [this.center.startDate, this.center.endDate];

    if (period[0].getTime() <= currentDate.getTime() &&
      currentDate.getTime() <= period[1].getTime()) {
      return true;
    }
    return false;
  }
  /**
    ゴミ処理センターを登録します。
    名前が一致するかどうかで判定を行っております。
  */
  this.setCenter = function (center_data) {
    for (var i in center_data) {
      if (this.centerName == center_data[i].name) {
        this.center = center_data[i];
      }
    }
  }
  /**
  ゴミのカテゴリのソートを行います。
  */
  this.sortTrash = function () {
    this.trash.sort(function (a, b) {
      if (a.mostRecent === undefined) return 1;
      if (b.mostRecent === undefined) return -1;
      var amr = a.mostRecent;
      var bmr = b.mostRecent;
      if (!amr && !bmr) {
        return 0;
      } else if (amr && !bmr) {
        return -1;
      } else if (!amr && bmr) {
        return 1;
      }
      var at = amr.getTime();
      var bt = bmr.getTime();
      if (at < bt) return -1;
      if (at > bt) return 1;
      return 0;
    });
  }
}

/**
  各ゴミのカテゴリを管理するクラスです。
*/
//var TrashModel = function(_lable, _cell, remarks) {
var TrashModel = function (_lable, _calendarNo) { //大分バージョン　ごみの種類、カレンダーNoのみ利用
  //this.remarks = remarks; //大分バージョン　利用しない
  //this.dayLabel; 大分バージョン使わない
  this.mostRecent;
  this.dayList = new Array();
  /* 大分バージョンでは使わない
  this.mflag = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var monthSplitFlag=_cell.search(/:/)>=0
  if (monthSplitFlag) {
    var flag = _cell.split(":");
    this.dayCell = flag[0].split(" ");
    var mm = flag[1].split(" ");
  } else if (_cell.length == 2 && _cell.substr(0,1) == "*") {
    this.dayCell = _cell.split(" ");
    var mm = new Array();
  } else {
    this.dayCell = _cell.split(" ");
    var mm = new Array("4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3");
  }
  for (var m in mm) {
    this.mflag[mm[m] - 1] = 1;
  }
  */
  this.label = _lable;

  //大分バージョンではCalendarDataからカレンダーNo、収集品目名称（テキスト）の一致する日付を取得して入れる
  for (var i in CalendarData) {
    var row = CalendarData[i];
    if (row[1] == _calendarNo && row[3] == _lable) {
      this.dayList.push(new Date(row[4]));
    }
  }

  /*
  this.description;
  this.regularFlg = 1;      // 定期回収フラグ（デフォルトはオン:1）

  var result_text = "";
  var today = new Date();
  //表示する頻度テキスト作成
  for (var j in this.dayCell) {
    if (this.dayCell[j].length == 1) {
      result_text += "毎週" + this.dayCell[j] + "曜日 ";
    } else if (this.dayCell[j].length == 2 && this.dayCell[j].substr(0,1) != "*") {
      result_text += "第" + this.dayCell[j].charAt(1) + this.dayCell[j].charAt(0) + "曜日 ";
    } else if (this.dayCell[j].length == 2 && this.dayCell[j].substr(0,1) == "*") {
    } else if (this.dayCell[j].length == 10 && this.dayCell[j].substr(0,1) == "隔") {
  */
  /**** MOD: PICK biweek, Ex:隔月20140401 ****/
  /****ADD****/
  /* 大分バージョン　使わない
      result_text += "隔週" + this.dayCell[j].charAt(1) + "曜 ";
      this.regularFlg = 2;      // 隔週フラグ
  */
  /****ADD****/
  /* 大分バージョン　使わない
    } else {
      // 不定期回収の場合（YYYYMMDD指定）
      result_text = "不定期 ";
      this.regularFlg = 0;  // 定期回収フラグオフ
    }
  }
  if (monthSplitFlag){
    var monthList="";
    for (var m in this.mflag) {
      if (this.mflag[m]){
        if (monthList.length>0){
          monthList+=","
        }
        //mを整数化
        monthList+=((m-0)+1)
      }
    };
    monthList+="月 "
    result_text=monthList+result_text
  }
  this.dayLabel = result_text;
  */
  this.getDateLabel = function () {
    if (this.mostRecent === undefined) {
      //return this.getRemark() + "不明";
      return "不明"; //大分バージョンではremarkを使わない
    }
    var result_text = this.mostRecent.getFullYear() + "/" + (1 + this.mostRecent.getMonth()) + "/" + this.mostRecent.getDate();
    //return this.getRemark() + this.dayLabel + " " + result_text;
    return result_text;
  }
  /*
  var day_enum = ["日", "月", "火", "水", "木", "金", "土"];

  function getDayIndex(str) {
    for (var i = 0; i < day_enum.length; i++) {
      if (day_enum[i] == str) {
        return i;
      }
    };
    return -1;
  }
  */

  /**
   * このごみ収集日が特殊な条件を持っている場合備考を返します。収集日データに"*n" が入っている場合に利用されます
   */
  //大分バージョンでは、使わない
  /*
  this.getRemark = function getRemark() {
    var ret = "";
    this.dayCell.forEach(function(day){
      if (day.substr(0,1) == "*") {
        remarks.forEach(function(remark){
          if (remark.id == day.substr(1,1)){
            ret += remark.text + "<br/>";
          }
        });
      };
    });
    return ret;
  }
  */
  /**
  このゴミの年間のゴミの日を計算します。
  センターが休止期間がある場合は、その期間１週間ずらすという実装を行っております。
  */
  //this.calcMostRect = function(areaObj) {
  this.calcMostRect = function () { //大分バージョンではAreaModelは使わない
    //alert("calcMostRect");
    //var day_mix = this.dayCell;　大分バージョンでは使わない
    var result_text = "";
    //var day_list = new Array(); 　大分バージョンでは使わない

    /* 大分バージョンでは使わない
    // 定期回収の場合
    if (this.regularFlg == 1) {

      var today = new Date();

      // 12月 +3月 を表現
      for (var i = 0; i < MaxMonth; i++) {

        var curMonth = today.getMonth() + i;
        var curYear = today.getFullYear() + Math.floor(curMonth / 12);
        var month = (curMonth % 12) + 1;

        // 収集が無い月はスキップ
        if (this.mflag[month - 1] == 0) {
            continue;
        }
        for (var j in day_mix) {
          //休止期間だったら、今後一週間ずらす。
          var isShift = false;

          //week=0が第1週目です。
          for (var week = 0; week < 5; week++) {
            //4月1日を起点として第n曜日などを計算する。
            var date = new Date(curYear, month - 1, 1);
            var d = new Date(date);
            //コンストラクタでやろうとするとうまく行かなかった。。
            //
            //4月1日を基準にして曜日の差分で時間を戻し、最大５週までの増加させて毎週を表現
            d.setTime(date.getTime() + 1000 * 60 * 60 * 24 *
              ((7 + getDayIndex(day_mix[j].charAt(0)) - date.getDay()) % 7) + week * 7 * 24 * 60 * 60 * 1000
            );
            //年末年始休暇のスキップ対応
            if (SkipSuspend) {
              if (areaObj.isBlankDay(d)) {
                continue;
              }
            }
            //年末年始のずらしの対応
            //休止期間なら、今後の日程を１週間ずらす
            if (areaObj.isBlankDay(d)) {
            if (WeekShift) {
                isShift = true;
              } else {
                continue;
              }
            }
      ////
            if (isShift) {
              d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
            }
            //同じ月の時のみ処理したい
            if (d.getMonth() != (month - 1) % 12) {
              continue;
            }
            //特定の週のみ処理する
            if (day_mix[j].length > 1) {
              if ((week != day_mix[j].charAt(1) - 1) || ("*" == day_mix[j].charAt(0))) {
                continue;
              }
            }

            day_list.push(d);
          }
        }
      }
      */
    /****ASS****/
    /*大分バージョンでは使わない
  } else if (this.regularFlg == 2) {
    // 隔週回収の場合は、basedateに指定初回日付をセット
    for (var j in day_mix) {
      var year = parseInt(day_mix[j].substr(2, 4));
      var month = parseInt(day_mix[j].substr(6, 2)) - 1;
      var day = parseInt(day_mix[j].substr(8, 2));
      var basedate = new Date(year, month, day);

      //week=0が第1週目です。
      for (var week = 0; week < 27; week++) {
        // basedate を起点に、最も近い偶数週目を計算する。
        var d = new Date(date);
        // basedate を基準に、最大53週まで増加させて隔週を表現
        d.setTime( basedate.getTime() + week * 14 * 24 * 60 * 60 * 1000 );
        //年末年始休暇のスキップ対応
        if (SkipSuspend) {
          if (areaObj.isBlankDay(d)) {
            continue;
          }
        }
        day_list.push(d);
      }
    }
    */
    /***ADD*****/
    /* 大分バージョンでは使わない   
    } else {
      // 不定期回収の場合は、そのまま指定された日付をセットする
      for (var j in day_mix) {
        var year = parseInt(day_mix[j].substr(0, 4));
        var month = parseInt(day_mix[j].substr(4, 2)) - 1;
        var day = parseInt(day_mix[j].substr(6, 2));
        var d = new Date(year, month, day);
        if (d.toString() !== "Invalid Date") {
            day_list.push(d);
        }
      }
    }

    */

    //曜日によっては日付順ではないので最終的にソートする。
    //ソートしなくてもなんとなりそうな気もしますが、とりあえずソート
    //day_list.sort(function(a, b) {
    this.dayList.sort(function (a, b) {  //大分バージョン
      var at = a.getTime();
      var bt = b.getTime();
      if (at < bt) return -1;
      if (at > bt) return 1;
      return 0;
    })
    //直近の日付を更新
    var now = new Date();
    /*
    for (var i in day_list) {
      if (this.mostRecent == null && now.getTime() < day_list[i].getTime() + 24 * 60 * 60 * 1000) {
        this.mostRecent = day_list[i];
        break;
      }
    };
    */
    for (var i in this.dayList) {
      if (this.mostRecent == null && now.getTime() < this.dayList[i].getTime() + 24 * 60 * 60 * 1000) {
        this.mostRecent = this.dayList[i];
        break;
      }
    };

    //this.dayList = day_list; 大分では使わない
  }
  /**
   計算したゴミの日一覧をリスト形式として取得します。
  */
  this.getDayList = function () {
    var day_text = "<ul>";
    for (var i in this.dayList) {
      var d = this.dayList[i];
      day_text += "<li>" + d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "</li>";
    };
    day_text += "</ul>";
    return day_text;
  }
}
/**
センターのデータを管理します。
*/
var CenterModel = function (row) {
  function getDay(center, index) {
    var tmp = center[index].split("/");
    return new Date(tmp[0], tmp[1] - 1, tmp[2]);
  }

  this.name = row[0];
  this.startDate = getDay(row, 1);
  this.endDate = getDay(row, 2);
}
/**
* ゴミのカテゴリを管理するクラスです。
* description.csvのモデルです。
*/
var DescriptionModel = function (data) {
  this.targets = new Array();

  this.label = data[0];
  this.sublabel = data[1];//not used
  this.description = data[2];//not used
  this.styles = data[3];
  this.background = data[4];

}
/**
 * ゴミのカテゴリの中のゴミの具体的なリストを管理するクラスです。
 * target.csvのモデルです。
 */
var TargetRowModel = function (data) {
  this.label = data[0];
  this.name = data[1];
  this.notice = data[2];
  this.furigana = data[3];
}

/**
 * ゴミ収集日に関する備考を管理するクラスです。
 * remarks.csvのモデルです。
 */
var RemarkModel = function (data) {
  this.id = data[0];
  this.text = data[1];
}

/* var windowHeight; */

/**
 * 大分バージョン
 * カレンダーデータを作成する（行数が多いため） 
 * calendar_days.csvのデータです。
 */
var CalendarData = new Array();
csvToArray("data/calendar_days.csv", function (tmp) {
  tmp.shift();
  for (var i in tmp) {
    CalendarData.push(tmp[i]);
  }
})

/**
 * 大分バージョン
 * 地区モデル
 */
var ChikuModel = function(data){
  this.label = data[0];
  this.kouku = new Array();
}

/**
 * 大分バージョン
 * 校区モデル
 */
 var KoukuModel = function(data){
  this.label = data[1];
  this.jichiku = new Array();
}

//大分バージョンでは他の関数でも利用するため外に出した
function csvToArray(filename, cb) {
  $.get(filename, function (csvdata) {
    //CSVのパース作業
    //CRの解析ミスがあった箇所を修正しました。
    //以前のコードだとCRが残ったままになります。
    // var csvdata = csvdata.replace("\r/gm", ""),
    csvdata = csvdata.replace(/\r/gm, "");
    var line = csvdata.split("\n"),
      ret = [];
    for (var i in line) {
      //空行はスルーする。
      if (line[i].length == 0) continue;

      var row = line[i].split(",");
      ret.push(row);
    }
    cb(ret);
  });
}

$(window).on("load", function () {
  // 読み込み完了したら実行する
  $("#loader").delay(600).fadeOut(300); // ローディングをフェードアウト
  $("#loader-bg").delay(900).fadeOut(800); // 背景色をフェードアウト
});

$(function () {
  /*   windowHeight = $(window).height(); */

  var center_data = new Array();
  var descriptions = new Array();
  var chikuModels = new Array();
  var koukuModels = new Array();
  var areaModels = new Array();
  var remarks = new Array();
  /*   var descriptions = new Array(); */

  /* ロード画面 */
  const h = $(window).height();
  $("#loader-bg ,#loader").height(h).css("display", "block"); //ローディング画像を表示

  function getSelectedChikuName() {
    return localStorage.getItem("selected_chiku_name");
  }

  function setSelectedChikuName(name) {
    localStorage.setItem("selected_chiku_name", name);
  }

  function getSelectedKoukuName() {
    return localStorage.getItem("selected_kouku_name");
  }

  function setSelectedKoukuName(name) {
    localStorage.setItem("selected_kouku_name", name);
  }

  function getSelectedAreaName() {
    return localStorage.getItem("selected_area_name");
  }

  function setSelectedAreaName(name) {
    localStorage.setItem("selected_area_name", name);
  }

  /* 大分バージョンでは他でも使うので外に出す
  function csvToArray(filename, cb) {
    $.get(filename, function(csvdata) {
      //CSVのパース作業
      //CRの解析ミスがあった箇所を修正しました。
      //以前のコードだとCRが残ったままになります。
      // var csvdata = csvdata.replace("\r/gm", ""),
       csvdata = csvdata.replace(/\r/gm, "");
      var line = csvdata.split("\n"),
          ret = [];
      for (var i in line) {
        //空行はスルーする。
        if (line[i].length == 0) continue;
  
        var row = line[i].split(",");
        ret.push(row);
      }
      cb(ret);
    });
  }
  */

  function updateAreaList() {
    //alert("updateAreaList");
    //大分バージョンへ変更:area_days.csvを使わずに、area_calendar.csvを利用 
    //csvToArray("data/area_days.csv", function(tmp) {
    csvToArray("data/area_calendar.csv", function (tmp) {
      //var area_days_label = tmp.shift();
      tmp.shift(); //大分バージョン　ヘッダは使わない
      for (var i in tmp) {
        var row = tmp[i];
        //地区データ作成
        var chiku = new ChikuModel(row);
        var cflg = 0;
        for (var c in chikuModels){
          if(chikuModels[c].label == chiku.label){
            cflg = 1;
            break;
          }
        }
        if(cflg == 0) {
          chikuModels.push(chiku);
        }
        //校区データ作成
        var kouku = new KoukuModel(row);
        var kflg = 0;
        for(var c in chikuModels){
          if(chikuModels[c].label == chiku.label){
            for (var k in chikuModels[c].kouku){
              if(chikuModels[c].kouku[k].label == kouku.label){
                kflg = 1;
                break;
              }
            }
            if(kflg == 0){
              chikuModels[c].kouku.push(kouku);
              break;
            }
          }
        }
        //自治区データ作成
        var area = new AreaModel();
        //area.label = row[0];
        area.label = row[2]; //大分バージョン
        //area.centerName = row[1];
        area.centerName = row[3]; //大分バージョン

        //大分バージョン
        for (var r = 0; r < descriptions.length; r++) {
          var trash = new TrashModel(descriptions[r].label, row[4]);
          area.trash.push(trash);
        }
        //ゴミ分類データを作ってからプッシュ
        var aflg = 0;
        for(var c in chikuModels){
          if(chikuModels[c].label == chiku.label){
            for (var k in chikuModels[c].kouku){
              if(chikuModels[c].kouku[k].label == kouku.label){
                chikuModels[c].kouku[k].jichiku.push(area);
                aflg = 1;
                break;
              }
            }
            if(aflg == 1){
              break;
            }
          }
        }

        /* 大分バージョンではカレンダーNoと収集品目名称からtrashModelを作る
        //２列目以降の処理
        for (var r = 2; r < 2 + MaxDescription; r++) {
          if (area_days_label[r]) {
            var trash = new TrashModel(area_days_label[r], row[r], remarks);
            area.trash.push(trash);
          }
        }
        */

      }

      csvToArray("data/center.csv", function (tmp) {
        //ゴミ処理センターのデータを解析します。
        //表示上は現れませんが、
        //金沢などの各処理センターの休止期間分は一週間ずらすという法則性のため
        //例えば第一金曜日のときは、一周ずらしその月だけ第二金曜日にする
        tmp.shift();
        for (var i in tmp) {
          var row = tmp[i];

          var center = new CenterModel(row);
          center_data.push(center);
        }
        //ゴミ処理センターを対応する各地域に割り当てます。
        for (var i in areaModels) {
          var area = areaModels[i];
          area.setCenter(center_data);
        };

        //エリアとゴミ処理センターを対応後に、表示のリストを生成する。
        //ListメニューのHTML作成
        var selected_name = getSelectedChikuName();
        var chiku_select_form = $("#select_chiku");
        var kouku_select_form = $("#select_kouku");
        var area_select_form = $("#select_area");
        var chiku_html = "";
        chiku_html += '<option value="-1">地区を選択してください</option>';
        for (var row_index in chikuModels) {
          var chiku_name = chikuModels[row_index].label;
          var selected = (selected_name == chiku_name) ? 'selected="selected"' : "";
          chiku_html += '<option value="' + row_index + '" ' + selected + " >" + chiku_name + "</option>";
        }
        //HTMLへの適応
        chiku_select_form.html(chiku_html);
        kouku_select_form.html('<option value="-1">-</option>')
        area_select_form.html('<option value="-1">-</option>');
        //area_select_form.change();  大分バージョン　先にchangeイベントが発生することを防ぐ
      });
    });
  }


  function createMenuList(after_action) {
    //alert("createMenuList");
    // 備考データを読み込む
    csvToArray("data/remarks.csv", function (data) {
      data.shift();
      for (var i in data) {
        remarks.push(new RemarkModel(data[i]));
      }
    });
    csvToArray("data/description.csv", function (data) {
      data.shift();
      for (var i in data) {
        descriptions.push(new DescriptionModel(data[i]));
      }

      csvToArray("data/target.csv", function (data) {

        data.shift();
        for (var i in data) {
          var row = new TargetRowModel(data[i]);
          for (var j = 0; j < descriptions.length; j++) {
            //一致してるものに追加する。
            if (descriptions[j].label == row.label) {
              descriptions[j].targets.push(row);
              break;
            }
          };
        }
        after_action();
        //$("#accordion2").show();

      });

    });

  }

  function updateData(row_index) {
    //alert("updateData");
    //SVG が使えるかどうかの判定を行う。
    //TODO Android 2.3以下では見れない（代替の表示も含め）不具合が改善されてない。。
    //参考 http://satussy.blogspot.jp/2011/12/javascript-svg.html
    //var ableSVG = (window.SVGAngle !== void 0);
    var ableSVG = false;  // SVG未使用の場合、descriptionの1項目目を使用 大分バージョンでは使わない
    var areaModel = areaModels[row_index];
    var today = new Date();
    //直近の一番近い日付を計算します。
    areaModel.calcMostRect();
    //トラッシュの近い順にソートします。
    areaModel.sortTrash();
    var accordion_height = $(window).height() / descriptions.length;
    if (descriptions.length > 4) {
      accordion_height = accordion_height / 4.1;
      if (accordion_height > 140) { accordion_height = accordion_height / descriptions.length; };
      if (accordion_height < 130) { accordion_height = 130; };
    }
    var styleHTML = "";
    var accordionHTML = "";
    //アコーディオンの分類から対応の計算を行います。
    for (var i in areaModel.trash) {
      var trash = areaModel.trash[i];

      for (var d_no in descriptions) {
        var description = descriptions[d_no];
        if (description.label != trash.label) {
          continue;
        }

        var target_tag = "";
        var furigana = "";
        var target_tag = "";
        var targets = description.targets;
        for (var j in targets) {
          var target = targets[j];
          if (furigana != target.furigana) {
            if (furigana != "") {
              target_tag += "</ul>";
            }

            furigana = target.furigana;

            target_tag += '<h4 class="initials">' + furigana + "</h4>";
            target_tag += "<ul>";
          }

          target_tag += '<li style="list-style:none;"><div>' + target.name + "</div>";
          target_tag += '<div class="note">' + target.notice + "</div></li>";
        }

        target_tag += "</ul>";

        var dateLabel = trash.getDateLabel();
        //あと何日かを計算する処理です。
        var leftDayText = "";
        if (trash.mostRecent === undefined) {
          leftDayText == "不明";
        } else {
          var leftDay = Math.ceil((trash.mostRecent.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

          if (leftDay == 0) {
            leftDayText = "今日";
          } else if (leftDay == 1) {
            leftDayText = "明日";
          } else if (leftDay == 2) {
            leftDayText = "明後日"
          } else {
            leftDayText = leftDay + "日後";
          }
        }

        styleHTML += '#accordion-group' + d_no + '{background-color:  ' + description.background + ';} ';

        accordionHTML +=
          '<div class="accordion-group" id="accordion-group' + d_no + '">' +
          '<div class="accordion-heading">' +
          '<a class="accordion-toggle" style="height:' + accordion_height + 'px" data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '">' +
          '<div class="left-day">' + leftDayText + '</div>' +
          '<div class="accordion-table" >';
        if (ableSVG && SVGLabel) {
          accordionHTML += '<img src="' + description.styles + '" alt="' + description.label + '"  />';
        } else {
          accordionHTML += '<p class="text-center">' + description.label + "</p>";
        }
        accordionHTML += "</div>" +
          '<h6><p class="text-left date">' + dateLabel + "</p></h6>" +
          "</a>" +
          "</div>" +
          '<div id="collapse' + i + '" class="accordion-body collapse">' +
          '<div class="accordion-inner">' +
          description.description + "<br />" + target_tag +
          '<div class="targetDays"></div></div>' +
          "</div>" +
          "</div>";
      }
    }

    $("#accordion-style").html('<!-- ' + styleHTML + ' -->');

    var accordion_elm = $("#accordion");
    accordion_elm.html(accordionHTML);

    $('html,body').animate({ scrollTop: 0 }, 'fast');

    //アコーディオンのラベル部分をクリックしたら
    $(".accordion-body").on("shown.bs.collapse", function () {
      var body = $('body');
      var accordion_offset = $($(this).parent().get(0)).offset().top;
      body.animate({
        scrollTop: accordion_offset
      }, 50);
    });
    //アコーディオンの非表示部分をクリックしたら
    $(".accordion-body").on("hidden.bs.collapse", function () {
      if ($(".in").length == 0) {
        $("html, body").scrollTop(0);
      }
    });
  }

  function onChangeSelect(row_index) {
    if (row_index == -1) {
      $("#accordion").html("");
      setSelectedAreaName("");
      return;
    }
    setSelectedAreaName(areaModels[row_index].label);

    if ($("#accordion").children().length === 0 && descriptions.length === 0) {
      //alert(699);

      createMenuList(function () {
        updateData(row_index);
      });

    } else {
      //alert(706);
      updateData(row_index);
    }
  }

  function onChangeChiku(row_index) {
    if (row_index == -1) {
      $("#accordion").html("");
      setSelectedChikuName("");
      $("#select_kouku").html('<option value="-1">-</option>');
      $("#select_area").html('<option value="-1">-</option>');
      return;
    }
    setSelectedChikuName(chikuModels[row_index].label);

    function updateKouku(r_index){
      koukuModels = chikuModels[r_index].kouku;
      var kouku_html = '<option value="-1">校区を選択してください</option>';
      for (var r in koukuModels) {
        var kouku_name = koukuModels[r].label;
        var selected = (kouku_name == getSelectedKoukuName()) ? 'selected="selected"' : "";
        kouku_html += '<option value="' + r + '" ' + selected + " >" + kouku_name + "</option>";
      }

      //HTMLへの適応
      $("#select_kouku").html(kouku_html);
      $("#select_area").html('<option value="-1">-</option>');
    }

    if ($("#accordion").children().length === 0 && descriptions.length === 0) {

      createMenuList(function () {
        updateKouku(row_index);
      });

    } else {
      //alert(706);
      updateKouku(row_index);
    }
  }

  function onChangeKouku(row_index) {
    if (row_index == -1) {
      $("#accordion").html("");
      setSelectedKoukuName("");
      $("#select_area").html('<option value="-1">-</option>');
      return;
    }
    setSelectedKoukuName(koukuModels[row_index].label);

    function updateArea(r_index){
      areaModels = koukuModels[r_index].jichiku;
      var area_html = '<option value="-1">自治区を選択してください</option>';
      for (var r in areaModels) {
        var area_name = areaModels[r].label;
        var selected = (area_name == getSelectedAreaName()) ? 'selected="selected"' : "";
        area_html += '<option value="' + r + '" ' + selected + " >" + area_name + "</option>";
      }

      //HTMLへの適応
      $("#select_area").html(area_html);
    }

    if ($("#accordion").children().length === 0 && descriptions.length === 0) {

      createMenuList(function () {
        updateArea(row_index);
      });

    } else {
      //alert(706);
      updateArea(row_index);
    }
  }

  function getAreaIndex(area_name) {
    for (var i in areaModels) {
      if (areaModels[i].label == area_name) {
        return i;
      }
    }
    return -1;
  }
  //リストが選択されたら
  $("#select_chiku").change(function (data) {
    //alert(721);
    var row_index = $(data.target).val();
    //alert(row_index);
    onChangeChiku(row_index);
  });
  $("#select_kouku").change(function (data) {
    //alert(721);
    var row_index = $(data.target).val();
    //alert(row_index);
    onChangeKouku(row_index);
  });
  $("#select_area").change(function (data) {
    //alert(721);
    var row_index = $(data.target).val();
    //alert(row_index);
    onChangeSelect(row_index);
  });

  //-----------------------------------
  //位置情報をもとに地域を自動的に設定する処理です。
  //これから下は現在、利用されておりません。
  //将来的に使うかもしれないので残してあります。
  $("#gps_area").click(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.getJSON("area_candidate.php", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function (data) {
        if (data.result == true) {
          var area_name = data.candidate;
          var index = getAreaIndex(area_name);
          $("#select_area").val(index).change();
          alert(area_name + "が設定されました");
        } else {
          alert(data.reason);
        }
      })

    }, function (error) {
      alert(getGpsErrorMessage(error));
    });
  });

  if (getSelectedAreaName() == null) {
    $("#accordion2").show();
    $("#collapseZero").addClass("in");
  }
  if (!navigator.geolocation) {
    $("#gps_area").css("display", "none");
  }

  function getGpsErrorMessage(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "User denied the request for Geolocation."
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable."
      case error.TIMEOUT:
        return "The request to get user location timed out."
      case error.UNKNOWN_ERROR:
      default:
        return "An unknown error occurred."
    }
  }
  //大分バージョン　先にメニューリスト作成
  createMenuList(function () {
    updateAreaList();
  });
});
