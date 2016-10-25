$( document ).ready(function() {
    var lastYear
      , lastMonth
      , lastWeek
      , lastWeekData
      , lastMonthData
      , startDate
      , endDate
      , startEndData
      , items

    $('.dropdown')
      .dropdown({
        onChange: function(value) {
          if (value == 0) {
            $('.betweenDateChart').removeClass('visible').addClass('hidden');
            $('.form').removeClass('visible').addClass('hidden');
            $('.monthChart').removeClass('visible').addClass('hidden');
            $('.weekChart').removeClass('hidden').addClass('visible');
          } else if (value == 1) {
            $('.betweenDateChart').removeClass('visible').addClass('hidden');
            $('.form').removeClass('visible').addClass('hidden');
            $('.weekChart').removeClass('visible').addClass('hidden');
            $('.monthChart').removeClass('hidden').addClass('visible');
          } else if (value == 2) {
            $('.form').removeClass('hidden').addClass('visible');
            $('.monthChart').removeClass('visible').addClass('hidden');
            $('.weekChart').removeClass('visible').addClass('hidden');
          }
        }
    });

    function getData() {
      var url = "https://gist.githubusercontent.com/evanjacobs/c150c0375030dc4de65e9b95784dc894/raw/35c5f455b147703db3989df0cb90f5781c3b312f/usage_data.json";
      $.getJSON( url, {format: "json"})
      .done(function( data ) {
        items = data;

        addDateAttributeToItems(data);
        lastWeekData = getLastWeekData(data);
        firstDayOfWeek = getLastWeekData(data).slice(-1)[0].date;
        lastDayOfWeek = getLastWeekData(data)[0].date;
        $('.startWeekDay').text(moment(firstDayOfWeek).format('MMMM Do YYYY'));
        $('.endWeekDay').text(moment(lastDayOfWeek).format('MMMM Do YYYY'));

        lastMonthData = getLastMonthData(data);
        monthName = moment(getLastMonthData(data)[0].date).format("MMMM");
        $('.monthName').text(monthName);

        setDates();
        setChart();
      });
    };
    getData();


    function setDates() {
      $('#rangestart').calendar({
        type: 'date',
        minDate: new Date('2013-11-28'),
        maxDate: new Date('2016-08-24'),
        endCalendar: $('#rangeend'),
        onChange: function(date){
          startDate = date
          if(startDate && endDate){
            getDataBetweenTwoDates()
            setChart()
            $('.betweenDateChart').removeClass('hidden').addClass('visible');
            $('.startDate').text(moment(startDate).format('MMMM Do YYYY'));
            $('.endDate').text(moment(endDate).format('MMMM Do YYYY'));
          }
        }
      })

      $('#rangeend').calendar({
        type: 'date',
        maxDate: new Date('2016-08-25'),
        startCalendar: $('#rangestart'),
        onChange: function(date){
          endDate = date;
          if(startDate && endDate){
            getDataBetweenTwoDates();
            setChart();
            $('.betweenDateChart').removeClass('hidden').addClass('visible');
            $('.startDate').text(moment(startDate).format('MMMM Do YYYY'));
            $('.endDate').text(moment(endDate).format('MMMM Do YYYY'));
          }
        }
      });
    }

    function setChart() {
      var weekDays = getDayOfWeek(lastWeekData);
      var recentWeekSearches = _.map(lastWeekData, function(item) {
        return item.searches
      })
      var recentWeekUsers = _.map(lastWeekData, function(item) {
        return item.users
      })

      var recentWeekData = {
        labels: weekDays,
        datasets: [
          {
            label: "Searches",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
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
            data: recentWeekSearches,
            spanGaps: false,
          },
          {
            label: "Users",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(193, 27, 174,1)",
            borderColor: "rgba(193, 27, 174,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(193, 27, 174,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(193, 27, 174,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: recentWeekUsers,
            spanGaps: false,
          }
        ]
      };
      var ctx = document.getElementById("recentWeekChart");
      var weeklyChart = new Chart(ctx, {
        type: 'line',
        data: recentWeekData
      });

      var daysOfMonth = getDayOfMonth(lastMonthData);
      var recentMonthSearches = _.map(lastMonthData, function(item) {
        return item.searches
      })
      var recentMonthUsers = _.map(lastMonthData, function(item) {
        return item.users
      })

      var recentMonthData = {
        labels: daysOfMonth,
        datasets: [
          {
            label: "Searches",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
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
            data: recentMonthSearches,
            spanGaps: false,
          },
          {
            label: "Users",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(193, 27, 174,1)",
            borderColor: "rgba(193, 27, 174,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(193, 27, 174,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(193, 27, 174,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: recentMonthUsers,
            spanGaps: false,
          }
        ]
      }
      var ctx = document.getElementById("recentMonthChart");
      var monthlyChart = new Chart(ctx, {
        type: 'line',
        data: recentMonthData
      });

      var startEndDates = _.map(startEndData, function(item) {
        return moment(item.date).format("M/D/YY")
      })
      var startEndSearches = _.map(startEndData, function(item) {
        return item.searches
      })
      var startEndUsers = _.map(startEndData, function(item) {
        return item.users
      })

      var betweenDateData = {
        labels: startEndDates,
        datasets: [
          {
            label: "Searches",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
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
            data: startEndSearches,
            spanGaps: false,
          },
          {
            label: "Users",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(193, 27, 174,1)",
            borderColor: "rgba(193, 27, 174,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(193, 27, 174,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(193, 27, 174,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: startEndUsers,
            spanGaps: false,
          }
        ]
      }
      var ctx = document.getElementById("betweenDateChart");
      var betweenDateChart = new Chart(ctx, {
        type: 'line',
        data: betweenDateData
      });
    }

    function getDayOfWeek(items) {
      var weekDays = [];
      weekDays = items.slice().reverse().map(function(item){
        return moment(item.date).format("dddd")
      });
      return weekDays;
    }

    function getDayOfMonth(items) {
      var monthDays = [];
      monthDays = items.slice().reverse().map(function(item){
        return moment(item.date).format("D")
      });
      return monthDays;
    }

    function addDateAttributeToItems(items) {
      items.forEach(function(item){
        item.week = moment(item.date, "YYYY-MM-DD").week()
        item.month = moment(item.date, "YYYY-MM-DD").month()
        item.year = moment(item.date, "YYYY-MM-DD").year()
      });
      lastYear = _.last( _.sortBy(items.map(function(item){
        return item.year
      }).slice().reverse(), function(sortingItem){
        return sortingItem.year
      }));
    };

    function getLastWeekData(items){
      lastWeek = _.last( _.sortBy(items.map(function(item){
        return item.week
      }).slice().reverse(), function(sortingItem){
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
      }).slice().reverse(), function(sortingItem){
        return sortingItem.month
      }))

      filteredItems = items.filter(function(item){
        return item.year == lastYear && item.month == lastMonth
      })

      return filteredItems
    }

    function getDataBetweenTwoDates() {
      startEndData = items.slice().reverse().filter(function(item){
        return moment(item.date, "YYYY-MM-DD").isBetween(startDate, endDate, null, '[]')
      })
    }
});
