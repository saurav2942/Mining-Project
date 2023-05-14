document.addEventListener("DOMContentLoaded", () => {
  // density velocity
  var DefaultRockTypeValues = {
    1: [
      [2.45, 3050],
      [2.65, 3700],
      [2.4, 3100],
      [2.55, 4000],
      [2.35, 2900],
    ],
    2: [
      [2.05, 2750],
      [2.15, 2250],
      [2.85, 5250],
      [2.55, 5000],
      [2.6, 4500],
    ],
    3: [
      [2.6, 3500],
      [2.45, 3350],
      [2.55, 3450],
      [2.45, 3350],
      [2.75, 4700],
    ],
    4: [
      [2.7, 5900],
      [2.7, 5900],
      [2.7, 5900],
      [2.7, 6000],
      [2.7, 5900],
    ],
    5: [
      [2.8, 6250],
      [2.8, 5900],
      [2.7, 6050],
      [2.9, 6250],
      [2.85, 6250],
    ],
    6: [
      [1.6, 4000],
      [1.25, 2750],
      [0.85, 1750],
      [1.25, 3250],
      [0.45, 1000],
    ],
    7: [
      [5.1, 4975],
      [5.05, 5350],
      [3.8, 3850],
      [4.25, 4300],
      [3.85, 3900],
    ],
    8: [
      [4.2, 4650],
      [4.95, 5250],
      [4.7, 4950],
      [3.8, 4000],
      [3.75, 4000],
    ],
    9: [
      [4, 4400],
      [4.45, 4750],
      [3.45, 3550],
      [5.65, 5850],
      [4.05, 4400],
    ],
    10: [
      [2.9, 2850],
      [2.35, 2450],
      [3.4, 3550],
      [2.65, 2600],
      [2.75, 2850],
    ],
  };

  // New Changes
  var DefaultRockTypeNames = {
    1: [
      "Arkose",
      "Greywacke",
      "Lithic Sandstone",
      "Quartz Sandstone",
      "Feldspathic",
    ],
    2: ["Chalk", "Coquina", "Dolomite", "Oolitic Limestone", "Travertine"],
    3: [
      "Black shale",
      "Green shale",
      "Grey shale",
      "Red shale",
      "Siliceous shale",
    ],
    4: [
      "Adamellite",
      "Alaskite",
      "Granite Porphyry",
      "Granodiorite",
      "Rapakivi Granite",
    ],
    5: [
      "Alkali Basalt",
      "Andesitic Basalt",
      "Basaltic Andesite",
      "Flood Basalt",
      "Oceanic Basalt",
    ],
    6: [
      "Anthracite Coal",
      "Bituminous Coal",
      "Lignite Coal",
      "Subbituminous Coal",
      "Peat",
    ],
    7: ["Hematite", "Magnetite", "Goethite", "Siderite", "Limonite"],
    8: ["Chalcopyrite", "Bornite", "Covellite", "Malachite", "Azurite"],
    9: ["Sphalerite", "Smithsonite", "Hemimorphite", "Zincite", "Willemite"],
    10: ["Bauxite", "Gibbsite", "Diaspore", "Kaolinite", "Alunite"],
  };

  // cost density velocity
  var DefaultExplosiveTypeValues = {
    1: [85, 1.175, 3450],
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
  var subRockType; // made another new variable ------------------
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
    // add this line -------------------------
    subRockType = document.getElementById("sub-rock-type");
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

      // New Changes-------------------------
      for (var i = 1; i <= 10; i++) {
        subRockType[i - 1].innerHTML =
          DefaultRockTypeNames[rockTypeValue][i - 1];
      }
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
      D = dia / 1000;
      burden = 30 * D;
      spacing = 1.15 * burden;
      subDrill = 15 * D;
      console.log(subDrill);
      console.log(bh);
      lengthOfHole = parseFloat(subDrill) + parseFloat(bh);
      stemming = 20 * D;
      Nholes = bw / spacing;
      Nholes = parseInt(Nholes);
      Nholes = Nholes * nr;
      cl = 20 * D;
      pwf =
        (burden * spacing * bh * rdd * 4) / (edd * 9810 * cl * 3.14 * D * D);
      totalcharge = (3.14 * D * D * cl * Nholes * edd * 9810) / 4;
      blct = totalcharge * ect;
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
      Nholes = parseInt(Nholes);
      pwf = parseFloat(pwf).toFixed(2);
      blct = parseFloat(blct).toFixed(2);
      document.getElementById("Diameter").value = dia;
      document.getElementById("Burden").value = burden;
      document.getElementById("Spacing").value = spacing;
      document.getElementById("SubDrill").value = subDrill;
      document.getElementById("Length Of Holes").value = lengthOfHole;
      document.getElementById("Stemming").value = stemming;
      document.getElementById("Number Of Holes").value = Nholes;
      document.getElementById("Powder Factor For A Hole").value = pwf;
      document.getElementById("Blasting Cost").value = blct;
      document.getElementById("Change Length").value = cl;
      document.getElementById("Total Charge").value =
        parseFloat(totalcharge).toFixed(2);

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
