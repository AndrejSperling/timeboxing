import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

document.addEventListener("DOMContentLoaded", () => {

    const calendarEl = document.getElementById("calendar");

    const calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
      header: {
        right: "today prev,next",
        left: "title",
        center: "timeGridDay,listDay",
      },
      defaultView: "timeGridDay",
      defaultDate: "2018-01-12",
      navLinks: true,
      editable: true,
      eventLimit: true,
      selectable: true,
      select: ({start, end}) => {
         alert("Start: " + start);
      },
      slotDuration: "00:15:00",
      slotLabelInterval: "00:15:00",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: "short",
        hour12: false,
      },
      events: [
        {
          title: "All Day Event",
          start: "2018-01-01",
        },
        {
          title: "Long Event",
          start: "2018-01-07",
          end: "2018-01-10",
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2018-01-09T16:00:00",
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2018-01-16T16:00:00",
        },
        {
          title: "Conference",
          start: "2018-01-11",
          end: "2018-01-13",
        },
      ],
    });

    calendar.render();

  });
