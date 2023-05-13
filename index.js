document.addEventListener("DOMContentLoaded", () => {
  // density velocity
  var DefaultRockTypeValues = {
    1: [
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
    ],
    2: [
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
    ],
    3: [
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
      [2.45, 3050],
    ],
  };
  // cost density velocity
  var DefaultExplosiveTypeValues = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 9, 9],
  };
  const ass = {};
  const pft = Number.MAX_VALUE;
  var ans = "NAN",
    dia,
    D,
    burden,
    spacing,
    subDrill,
    lengthOfHole,
    stemming,
    Nholes,
    cl,
    pwf,
    totalcharge,
    blct,
    v1,
    v2,
    v3,
    r1,
    r2,
    r3;
  var rockType = document.getElementById("rock-type");
  var rockTypeValue = 0;
  var subRockTypevalue = 0;

  var explosiveType = document.getElementById("explosive-type");
  var explosiveTypeValue = 0;
  document;
  rockType.addEventListener("change", (updateOptions) => {
    var RTotherContainerDiv = document.getElementById(
      "rocktype-other-container"
    );
    rockTypeValue = rockType.value;
    RTotherContainerDiv.style.display = "none";
    const subRockTypeDiv = document.getElementById("rocktype-subcategory");

    var RTsubInput = document.getElementsByClassName("rock-sub-input");
    RTsubInput.value = 0;
    if (rockTypeValue == 0) {
      // explosivetpe_P_tag
      var ctet = document.getElementById("ct-et");
      ctet.style.display = "block";
      RTotherContainerDiv.style.display = "inline-block";
      subRockTypeDiv.style.display = "none";
      // here will go variable values
    } else {
      RTsubInput.value = "0";
      subRockTypeDiv.style.display = "block";
      // here will go constant values
    }
  });

  document;
  explosiveType.addEventListener("change", (updateOptions) => {
    var ETotherContainerDiv = document.getElementById(
      "explosivetype-other-container"
    );
    explosiveTypeValue = explosiveType.value;
    ETotherContainerDiv.style.display = "none";
    var subInput = document.getElementsByClassName("et-input");
    subInput.value = 0;

    if (explosiveTypeValue == 0) {
      ETotherContainerDiv.style.display = "inline-block";
      // here will go constant values
    } else {
      subInput.value = "0";
      // here will go constant values
    }
  });

  // After Calculation  ->
  document
    .getElementById("calculate")
    .addEventListener("click", (showCalclcs) => {
      //Taking all variables
      var nr = document.getElementById("number-rows").value;
      var bh = document.getElementById("bench-height").value;
      var bw = document.getElementById("bench-width").value;
      subRockTypevalue = document.getElementById("sub-rock-type").value;

      var rpwv, rdd, epwv, ect, edd;
      if (rockType.value == 0) {
        rdd = document.getElementById("rt-sub-input1").value;
        rpwv = document.getElementById("rt-sub-input2").value;
        // here will go variable values
      } else {
        rdd = DefaultRockTypeValues[rockTypeValue][subRockTypevalue][0];
        rpwv = DefaultRockTypeValues[rockType.value][subRockTypevalue][1];
        // here will go constant values
      }

      if (explosiveType.value == 0) {
        // here will go constant values
        ect = document.getElementById("et-sub-input1").value;
        edd = document.getElementById("et-sub-input2").value;
        epwv = document.getElementById("et-sub-input3").value;
      } else {
        ect = DefaultExplosiveTypeValues[explosiveTypeValue][0];
        edd = DefaultExplosiveTypeValues[explosiveTypeValue][1];
        epwv = DefaultExplosiveTypeValues[explosiveTypeValue][2];
        // here will go constant values
      }

      pre = rdd * rpwv - edd * epwv;
      if (pft >= Math.abs(pre)) {
        ans = explosiveType.innerHTML;
      }
      dia = 15 * bh;
      D = dia / 1;
      burden = 30 * D;
      spacing = 1.15 * burden;
      subDrill = 15 * D;
      lengthOfHole = subDrill + bh;
      stemming = 20 * D;
      Nholes = (bh / spacing) * nr;
      cl = 20 * D;
      pwf = (burden * spacing * bh * rdd * 4) / (edd * cl * 3.14 * D * D);
      totalcharge = (3.14 * D * D * cl * nr * edd) / 4;
      blct = totalcharge / ect;
      (v1 = 10), (v2 = 25), (v3 = 5);
      r1 = (Math.pow(v1, 0.625) * Math.sqrt(totalcharge)) / 1140;
      r2 = (Math.pow(v2, 0.625) * Math.sqrt(totalcharge)) / 1140;
      r3 = (Math.pow(v3, 0.625) * Math.sqrt(totalcharge)) / 1140;
      // console.log(nr);
      // console.log(bh);
      // console.log(bw);
      // console.log(rockTypeValue);
      // console.log(subRockTypevalue);
      // console.log(rdd);
      // console.log(rpwv);
      // console.log(ect);
      // console.log(edd);
      // console.log(epwv);
    
      // first D -> Id Value And Second value -> the variable which is denoting the current element
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("D").value = D;
      document.getElementById("aft-clc").style.display = "contents";
    });
  // Report Generating API
  document.getElementById("report").addEventListener("click", (openNewPage) => {
    // Create object containing variables
    var vars = {
      var1: ans,
      var2: Nholes,
      var3: D,
      var4: burden,
      var5: spacing,
      var6: subDrill,
      var7: cl,
      var8: stemming,
      var9: pwf,
      var10: blct,
      var11: r1,
      var12: r2,
      var13: r3,
      // ...
    };

    // Encode object as JSON and URL parameter
    var params = "?vars=" + encodeURIComponent(JSON.stringify(vars));

    // Open new window or tab with new page URL
    window.open("newpage.html" + params, "_blank");
  });
});
