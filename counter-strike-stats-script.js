function isHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === "none";
}

(async () => {
  while (!isHidden(document.getElementById("load_more_button"))) {
    document.getElementById("load_more_button").click();
    await new Promise((r) => setTimeout(r, 2000));
    window.scrollTo(0, document.body.scrollHeight);
  }

  let elems = document.getElementsByClassName("tradehistoryrow");
  let datas = [];

  for (const row of elems) {
    const content = row.querySelector(".tradehistory_content");
    const content_description = row.querySelector(
      ".tradehistory_event_description"
    );
    const isTrade = content_description.textContent.includes(
      "Unlocked a container"
    );

    if (isTrade) {
      const date_text = row.querySelector(".tradehistory_date").textContent;
      const items = row.querySelectorAll(".history_item_name");
      const case_text =
        row.querySelectorAll(".history_item_name")[0].textContent;
      const unboxed_item_text =
        row.querySelectorAll(".history_item_name")[
          row.querySelectorAll(".history_item_name").length - 1
        ].textContent;

      const data = {
        date: date_text.replace(/(\r\n|\n|\r|\t)/gm, ""),
        case: case_text.replace(/(\r\n|\n|\r|\t)/gm, ""),
        unboxed: unboxed_item_text.replace(/(\r\n|\n|\r|\t)/gm, ""),
        csgo_stash_url: unboxed_item_text
          .replace(/(\r\n|\n|\r|\t)/gm, "")
          .replace("StatTrak™", "")
          .replace(" | ", "-"),
      };

      datas.push(data);
    }
  }

  console.log(datas);
})();

const row = elems[0];
const content = row.querySelector(".tradehistory_content");
const content_description = row.querySelector(
  ".tradehistory_event_description"
);
const isTrade = content_description.textContent.includes(
  "Unlocked a container"
);

if (isTrade) {
  const date_text = row.querySelector(".tradehistory_date").textContent;
  const items = row.querySelectorAll(".history_item_name");
  const case_text = row.querySelectorAll(".history_item_name")[0].textContent;
  const unboxed_item_text =
    row.querySelectorAll(".history_item_name")[2].textContent;

  const data = {
    date: date_text.replace(/(\r\n|\n|\r)/gm, ""),
    case: case_text.replace(/(\r\n|\n|\r)/gm, ""),
    unboxed: unboxed_item_text.replace(/(\r\n|\n|\r)/gm, ""),
  };

  console.log(data);
}

(async () => {
  function isHidden(el) {
    var style = window.getComputedStyle(el);
    return style.display === "none";
  }

  while (!isHidden(document.getElementById("load_more_button"))) {
    const load_button = document.getElementById("load_more_button");

    load_button.scrollIntoView();
    load_button.click();
    await new Promise((r) => setTimeout(r, 2000));
  }

  let elems = document.getElementsByClassName("tradehistoryrow");
  let datas = [];

  let stats = {
    "Mil-Spec": 0,
    Restricted: 0,
    Classified: 0,
    Covert: 0,
    "★": 0,
  };

  for (const row of elems) {
    const content = row.querySelector(".tradehistory_content");
    const content_description = row.querySelector(
      ".tradehistory_event_description"
    );
    const isTrade = content_description.textContent.includes(
      "Unlocked a container"
    );

    if (isTrade) {
      const date_text = row.querySelector(".tradehistory_date").textContent;
      const items = row.querySelectorAll(".history_item");
      const unboxed_case = items[0];
      const unboxed_case_text = unboxed_case.textContent;
      const unboxed_item = items[items.length - 1];
      const unboxed_item_text = unboxed_item.textContent.replace(
        /(\r\n|\n|\r|\t)/gm,
        ""
      );

      unboxed_item.scrollIntoView();
      unboxed_item.dispatchEvent(new Event("mouseover"));
      await new Promise((r) => setTimeout(r, 750));

      const hover_item_descriptors = document.getElementById(
        "hover_item_descriptors"
      );
      const all_descriptors =
        hover_item_descriptors.querySelectorAll(".descriptor");
      const wear_text = all_descriptors[0].textContent.replace(
        "Exterior: ",
        ""
      );
      const type_text = document.getElementById("hover_item_type").textContent;

      unboxed_item.dispatchEvent(new Event("mouseout"));

      const data = {
        date: date_text.replace(/(\r\n|\n|\r|\t)/gm, ""),
        case: unboxed_case_text.replace(/(\r\n|\n|\r|\t)/gm, ""),
        unboxed: unboxed_item_text,
        csgo_stash_url: unboxed_item_text
          .replace(/(\r\n|\n|\r|\t)/gm, "")
          .replace("StatTrak™", "")
          .replace(" | ", "-"),
        wear: wear_text,
        type: type_text,
        steam_community_market_link: `https://steamcommunity.com/market/listings/730/${unboxed_item_text} (${wear_text})`,
      };

      datas.push(data);

      for (const spec of Object.keys(stats)) {
        if (data.type.includes(spec)) {
          stats[spec] = stats[spec] + 1;
        }
      }
    }
  }

  console.log(datas);
  console.log(stats);
})();
