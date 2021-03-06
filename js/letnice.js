function Year()
{
  let base = document.getElementById("center");

  const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const dayNames = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]

  let year = new Date().getFullYear();
  let month = 0;
  let style = "day";
  
  function doHeader()
  {
    return `<div class="header"><p class="y">${year}</p><p class="p">${yearProgress(year) + "%"}</p></div>`;
  }

  while(month < 12)
  {
    base.innerHTML += `<div class="month">
      ${month==0?doHeader():""}
      <p class="m">${monthNames[new Date(year, month).getMonth()].substr(0,2)}</p>
      <svg class="graph" id="${monthNames[month]}">
      ${doLabels()}
      ${doMonth(month)}
      </svg></div>`
    month++
  }

  function doLabels()
  {
    let html = "";
    let y = 0;
    
    for(i = 0; i < 7; i++)
    {
      y = (i * 14)+1;
      html += `<text class="dayLabel" x="5" y='${y}' dy="10">${dayNames[i].substr(0,1)}</text>`
    }
    return html;
  }

  function doMonth(month)
  {
    html = "";
    monthLength = new Date(year, month+1, 0).getDate();
    let date = 0;
    let x = 0;
    let y = 0;
    let today = new Date(year, new Date().getMonth(), new Date().getDate(), 0);

    while(date < monthLength)
    {
      x += 14;
      let week = 0
      
      while(week < 7 && date != monthLength)
      {
        y = week * 14 + 2;
        let day = new Date(year, month, date);

        if(day.getDay() != week)
        {
          style = "null";
          date--
        }
        else if(day < today)
        {
          style = "gone";
        }
        else if(day.getDay() == 5 || day.getDay() == 6)
        {
          style = "weekend";
        }
        else
        {
          style = "day";
        }

        html += `<rect class='${style}' x='${x}' y='${y}' title='${dayNames[week] + "_" + (date+1)}' width="12px" height="12px" rx="2" ry="2" onclick=""></rect>`
        week++
        date++
      }
    }
    return html;
  }

  function yearProgress(year)
  {
    progress = new Date() - new Date(year, 0, 1, 0);
    return ((progress/31536000000)*100).toFixed(2);
  }
}