$( document ).ready(function() {
    var lastYear
      , lastMonth
      , lastWeek
      , lastWeekData

    function getData() {
      var url = "https://gist.githubusercontent.com/evanjacobs/c150c0375030dc4de65e9b95784dc894/raw/35c5f455b147703db3989df0cb90f5781c3b312f/usage_data.json";
      $.getJSON( url, {format: "json"})
      .done(function( data ) {
        var items = [];
        addDateAttributeToItems(data);
        lastWeekData = getLastWeekData(data)
        console.log("LAST WEEK SHITTT");
        console.log(lastWeekData);
        getDayOfWeek(lastWeekData);
        var lastMonthData = getLastMonthData(data)
        console.log("LAST MONTH SHITTT");
        console.log(lastMonthData);
        setChart();
        $.each( data, function(i, item) {
          var date = data[i].date;
          var users = data[i].users;
          var searches = data[i].searches;
          items.push( "<li>" + date + " "+ users + " "+ searches+ "</li>" );
        })
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
    };
    getData();

    function setChart() {
      console.log("LAST WEEEEEK");
      console.log(lastWeekData);
      var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Latest Week",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      };
      var ctx = document.getElementById("weeklyChart");
      var weeklyChart = new Chart(ctx, {
        type: 'line',
        data: data
      });
    }

    function getDayOfWeek(items) {
      console.log("Week Day");
      var weekDays = [];
      weekDays = items.reverse().map(function(item){
        return moment(item.date).format("dddd")
      });
      console.log(weekDays);
    }
    function addDateAttributeToItems(items) {
      items.forEach(function(item){
        item.week = moment(item.date, "YYYY-MM-DD").week()
        item.month = moment(item.date, "YYYY-MM-DD").month()
        item.year = moment(item.date, "YYYY-MM-DD").year()
      });
      lastYear = _.last( _.sortBy(items.map(function(item){
        return item.year
      }).reverse(), function(sortingItem){
        return sortingItem.year
      }));
    };

    function getLastWeekData(items){
      lastWeek = _.last( _.sortBy(items.map(function(item){
        return item.week
      }).reverse(), function(sortingItem){
        return sortingItem.week
      }))

      filteredItems = items.filter(function(item){
        return item.year == lastYear && item.week == lastWeek
      })

      return filteredItems
    }

    function getLastMonthData(items){
      lastMonth = _.last(_.sortBy(items.map(function(item){
        return item.month
      }).reverse(), function(sortingItem){
        return sortingItem.month
      }))

      filteredItems = items.filter(function(item){
        return item.year == lastYear && item.month == lastMonth
      })

      return filteredItems
    }


});
