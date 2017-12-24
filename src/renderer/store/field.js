function useDay (player) {
  alert('Use day')
  // if DateType = dtPost     then Day := TDayPost.Create()     else
  // if DateType = dtBusiness then Day := TDayBusiness.Create() else
  // if DateType = dtClient   then Day := TDayClient.Create()   else
  // if DateType = dtAuction  then Day := TDayAuction.Create()  else
  // if DateType = dtElection then Day := TDayElection.Create() else
  // if DateType = dtEnd      then Day := TDayEnd.Create()      else
  // Day := TDay.Create();

  // Day.UseDay;
}

const dtFree = 0
const dtPost = 1
const dtBusiness = 2
const dtClient = 3
const dtAuction = 4
const dtElection = 5
const dtTirage = 6
const dtSeason = 7
const dtEnd = 8

function createPostDay (date) {
  return {
    date: date,
    dateType: dtPost,
    caption: 'Почта',
    cost: 0,
    useDay: function (player) {
      // fmPost.ShowPost(fmPlay.Player.Messages.CurrentMessage);

      // M := fmPlay.Player.Messages.CurrentMessage;
      /*
       * PostText := M.From + #13 + M.Text + #13 + IntToStr(M.Cost)
       */

      var ticket = -1
      for (var i = 0; i <= 2; i++) {
        if (player.tickets[i].active) {
          ticket = i
        }
      }

      if (ticket >= 0) {
        /*
        if (MessageDlg('Pay?', mtInformation, [mbYes, mbNo], 0) = mrYes) {
          fmPlay.Player.PayTicket(Ticket)
        }
        */

        /*
         * if MessageDlg(PostText, mtInformation, [mbYes, mbNo], 0) = mrYes then
         *   fmPlay.Player.PayTicket(Ticket);
         */
      } else {
        alert('No post')
        /*
         * MessageDlg(PostText, mtInformation, [mbOk], 0);
         */
      }

      player.doPost()
    }
  }
}

function createBusinessDay (date) {
  return {
    date: date,
    dateType: dtBusiness,
    caption: 'Бизнес',
    cost: 0,
    useDay: function (player) {
      alert('BUSINESS')
    }
  }
}

function createClientDay (date) {
  return {
    date: date,
    dateType: dtClient,
    caption: 'Клиент',
    cost: 0,
    useDay: function (player) {
      alert('CLIENT')
    }
  }
}

function createFreeDay (date) {
  return {
    date: date,
    dateType: dtFree,
    caption: 'Выходной',
    cost: 0,
    useDay: function (player) {
    }
  }
}

function createPayableDay (date, caption, cost) {
  return {
    date: date,
    dateType: dtFree,
    caption: caption,
    cost: cost,
    useDay: function (player) {
      alert(caption)
    }
  }
}

/*
function useDayBase (player) {
  // if Player.FieldDate.DateType = dtTirage then DoTirage;
  // if Player.FieldDate.DateType = dtSeason then DoSeason;
  // ShowMessage('This day');
}
*/

function useDayAuction (player) {
  alert('Auction')
}

function useDayElection (player) {
  alert('Election')
}

var field = {
  fieldData: [
    {
      date: 0,
      dateType: dtFree,
      caption: 'Старт',
      cost: 0,
      useDay: function (player) {
        //
      }
    },
    createPostDay(1),
    createPayableDay(2, 'Давно забытая заначка', 500),
    createPostDay(3),
    createBusinessDay(4),
    createPostDay(5),
    createPayableDay(6, 'Капкан для охотника', -50),

    createFreeDay(7),
    createPayableDay(8, 'Премия-Сюрприз', 100),
    createClientDay(9),
    { date: 10, dateType: dtAuction, caption: 'caption', cost: 0, useDay: useDayAuction },
    createPostDay(11),
    createBusinessDay(12),
    createPayableDay(13, 'Танцевальная студия', -40),

    createFreeDay(14),
    createBusinessDay(15),
    createPostDay(16),
    createClientDay(17),
    createPayableDay(18, 'Ремонт норы', -75),
    createPostDay(19),
    createClientDay(20),

    createFreeDay(21),
    createPostDay(22),
    createPayableDay(23, 'Магазин "Мяу-Мяу" для кошек', -75),
    createPostDay(24),
    { date: 25, dateType: dtElection, caption: 'caption', cost: 0, useDay: useDayElection },
    createBusinessDay(26),
    { date: 27, dateType: dtSeason, caption: 'caption', cost: 0 },

    createFreeDay(28),
    { date: 29, dateType: dtTirage, caption: 'caption', cost: 0 },
    createClientDay(30),
    {
      date: 31,
      dateType: dtEnd,
      caption: 'День Белой Вороны',
      cost: 325,
      useDay: function (player) {
        // fmBalance.ShowBalance(fmPlay.Player)
        player.nextMonth()
      }
    }
  ],
  locations: [],
  create: function () {
    // AssignFile(DataFile, 'data/field.dat');
    // Reset(DataFile);
    // while not EOF(DataFile) do
    for (var d = 0; d < this.fieldData.length; d++) {
      var fd = this.fieldData[d]
      this.locations.push(fd)
    }
  }
}

field.create()

function getDate (date) {
  var fd = field.locations[date]
  if (!fd.useDay) {
    fd.useDay = useDay
  }
  return fd
}

module.exports = {
  field: field,
  getDate: getDate
}
