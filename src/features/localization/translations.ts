import type { AppLanguage } from "./types/app-language";

export const translations = {
  sq: {
    common: {
      back: "Kthehu",
      cancel: "Anulo",
      change: "Ndrysho",
      no: "Jo",
      price: "Çmimi",
      duration: "Kohëzgjatja",
      minutes: "min",
    },
    tabs: {
      home: "Ballina",
      appointments: "Terminet",
      profile: "Profili",
    },
    auth: {
      eyebrow: "Qethja jote te",
      description:
        "Rezervo termin për 30 sekonda — pa telefonata, pa pritje.",
      google: "Vazhdo me Google",
      attribution: "Sign in from",
      googleError:
        "Hyrja me Google dështoi. Provo përsëri.",
    },
    home: {
      greeting: "Përshëndetje,",
      guest: "Mik",
      services: "Shërbimet",
      loadingServices: "Duke ngarkuar shërbimet...",
      servicesError:
        "Shërbimet nuk mund të ngarkohen.",
      editAppointmentTitle: "Ndrysho terminin",
      editAppointmentMessage:
        "Ndryshimi i terminit do të ndërtohet në hapin e rezervimeve.",
      cancellationTitle: "Anulo terminin?",
      cancellationMessage:
        "A je i sigurt që dëshiron të anulosh {name}?",
      cancellationFailedTitle: "Anulimi dështoi",
      cancellationFailedMessage:
        "Nuk mundëm ta anulonim terminin. Provo përsëri.",
      dismissAnnouncement: "Mbyll njoftimin",
    },
    serviceCategories: {
      heading: "Kategoritë",
      haircut: "Qethje",
      shave: "Rroje",
      styling: "Stilim",
    },
    services: {
      countOne: "1 shërbim",
      countMany: "{count} shërbime",
      empty:
        "Nuk ka shërbime në këtë kategori.",
      select: "Zgjidh {name}",
    },
    appointments: {
      title: "Terminet",
      countOne: "1 termin i rezervuar",
      countMany:
        "{count} termine të rezervuara",
      emptyTitle: "Nuk ke termine",
      emptyDescription:
        "Zgjidh një shërbim nga Ballina për të rezervuar terminin tënd.",
      upcoming: "I ardhshëm",
      next: "Termini yt i radhës",
      cancelAccessibility: "Anulo {name}",
    },
    booking: {
      eyebrow: "REZERVO TERMININ",
      title: "Zgjidh datën dhe orën",
      loading: "Duke ngarkuar shërbimin...",
      loadError:
        "Të dhënat e rezervimit nuk mund të ngarkohen.",
      serviceNotFound: "Shërbimi nuk u gjet",
      availabilityChecking:
        "Duke kontrolluar oraret...",
      availabilityError:
        "Oraret nuk mund të ngarkohen.",
      noAvailability:
        "Nuk ka orare të disponueshme për këtë ditë.",
      unavailableTitle:
        "Orari nuk është i disponueshëm",
      failedTitle: "Rezervimi dështoi",
      failedMessage:
        "Nuk mundëm ta konfirmojmë rezervimin. Provo përsëri.",
      confirmationTitle:
        "Rezervimi u konfirmua!",
      selectDate: "Zgjidh datën",
      today: "Sot",
      selectTime: "Zgjidh orën",
      unavailableHint:
        "Orari me vijë nuk është i disponueshëm",
      timeAccessibility: "Ora {time}",
      selectedService: "SHËRBIMI I ZGJEDHUR",
      changeService: "Ndrysho shërbimin",
      summary: "Përmbledhja",
      service: "Shërbimi",
      date: "Data",
      time: "Ora",
      total: "Totali",
      confirm: "Konfirmo rezervimin",
    },
    profile: {
      title: "Profili",
      description:
        "Menaxho llogarinë dhe preferencat.",
      signOut: "Dil nga llogaria",
      preferences: "Preferencat",
      language: "Gjuha",
      customer: "Klienti",
      emailUnavailable:
        "Emaili nuk është i disponueshëm",
      information: "Informacionet",
      aboutShop: "Rreth lokalit",
      aboutShopDescription:
        "Kontakti, adresa dhe rrjetet sociale",
      openAboutShop:
        "Hap informacionet e lokalit",
      privacy: "Privatësia",
      terms: "Kushtet e përdorimit",
      appVersion: "Versioni i aplikacionit",
    },
    business: {
      title: "Rreth lokalit",
      description:
        "Kontakto ose gjej Behar Barber.",
      businessContact: "Kontakti i biznesit",
      barber: "Berberi: {name}",
      address: "Adresa",
      phone: "Telefoni",
      email: "Emaili",
      instagram: "Instagram",
      openLocation: "Hap lokacionin",
      openContact: "Hap {label}: {value}",
      noContactInformation:
        "Informacionet e kontaktit nuk janë caktuar ende.",
      loading:
        "Duke ngarkuar informacionet e biznesit...",
      loadError:
        "Informacionet e biznesit nuk mund të ngarkohen.",
      retry: "Provo përsëri",
      linkErrorTitle: "Lidhja nuk u hap",
      linkErrorMessage:
        "Nuk mundëm ta hapnim këtë lidhje. Provo përsëri.",
    },
    legal: {
      privacyTitle: "Privatësia",
      privacyDescription:
        "Mëso si i përdorim dhe i mbrojmë të dhënat e tua.",
      dataCollectedTitle:
        "Të dhënat që mbledhim",
      dataCollectedBody:
        "Ruajmë informacionet bazë të llogarisë, si emri dhe emaili, si dhe të dhënat e termineve që rezervon.",
      dataUsageTitle:
        "Si i përdorim të dhënat",
      dataUsageBody:
        "Të dhënat përdoren për hyrjen në llogari, rezervimin dhe menaxhimin e termineve dhe komunikimin e informacioneve të rëndësishme.",
      dataProtectionTitle:
        "Mbrojtja e të dhënave",
      dataProtectionBody:
        "Hyrja menaxhohet përmes Clerk, ndërsa të dhënat e aplikacionit ruhen në sistemet e backend-it të Behar Barber.",
      userChoicesTitle: "Zgjedhjet e tua",
      userChoicesBody:
        "Mund të kërkosh korrigjimin ose fshirjen e të dhënave të tua duke kontaktuar Behar Barber.",
      termsTitle: "Kushtet e përdorimit",
      termsDescription:
        "Rregullat bazë për përdorimin e aplikacionit dhe rezervimin e termineve.",
      bookingTitle: "Rezervimet",
      bookingBody:
        "Zgjidh shërbimin, datën dhe orën me kujdes. Termini konsiderohet i rezervuar pasi konfirmimi shfaqet në aplikacion.",
      cancellationTitle: "Anulimet",
      cancellationBody:
        "Nëse nuk mund të vish, anuloje terminin sa më herët që të jetë e mundur për ta liruar orarin.",
      availabilityTitle: "Disponueshmëria",
      availabilityBody:
        "Oraret varen nga orari i punës, bllokimet dhe rezervimet ekzistuese. Disponueshmëria mund të ndryshojë.",
      responsibleUseTitle:
        "Përdorimi i përgjegjshëm",
      responsibleUseBody:
        "Mos krijo rezervime të rreme dhe mos përdor llogarinë e një personi tjetër pa leje.",
    },
    feedback: {
      seeYouSoon: "Shihemi së shpejti!",
    },
  },

  en: {
    common: {
      back: "Back",
      cancel: "Cancel",
      change: "Change",
      no: "No",
      price: "Price",
      duration: "Duration",
      minutes: "min",
    },
    tabs: {
      home: "Home",
      appointments: "Appointments",
      profile: "Profile",
    },
    auth: {
      eyebrow: "Your haircut at",
      description:
        "Book your appointment in 30 seconds — no calls, no waiting.",
      google: "Continue with Google",
      attribution: "Sign in from",
      googleError:
        "Google sign-in failed. Please try again.",
    },
    home: {
      greeting: "Welcome,",
      guest: "Guest",
      services: "Services",
      loadingServices: "Loading services...",
      servicesError:
        "Services could not be loaded.",
      editAppointmentTitle: "Change appointment",
      editAppointmentMessage:
        "Changing an appointment will be added to the booking flow.",
      cancellationTitle: "Cancel appointment?",
      cancellationMessage:
        "Are you sure you want to cancel {name}?",
      cancellationFailedTitle:
        "Cancellation failed",
      cancellationFailedMessage:
        "We could not cancel the appointment. Please try again.",
      dismissAnnouncement: "Dismiss announcement",
    },
    serviceCategories: {
      heading: "Categories",
      haircut: "Haircuts",
      shave: "Shaving",
      styling: "Styling",
    },
    services: {
      countOne: "1 service",
      countMany: "{count} services",
      empty:
        "There are no services in this category.",
      select: "Select {name}",
    },
    appointments: {
      title: "Appointments",
      countOne: "1 booked appointment",
      countMany: "{count} booked appointments",
      emptyTitle: "No appointments yet",
      emptyDescription:
        "Choose a service from Home to book your appointment.",
      upcoming: "Upcoming",
      next: "Your next appointment",
      cancelAccessibility: "Cancel {name}",
    },
    booking: {
      eyebrow: "BOOK AN APPOINTMENT",
      title: "Choose a date and time",
      loading: "Loading service...",
      loadError:
        "Booking information could not be loaded.",
      serviceNotFound: "Service not found",
      availabilityChecking:
        "Checking available times...",
      availabilityError:
        "Available times could not be loaded.",
      noAvailability:
        "There are no available times for this day.",
      unavailableTitle: "Time is unavailable",
      failedTitle: "Booking failed",
      failedMessage:
        "We could not confirm your booking. Please try again.",
      confirmationTitle: "Booking confirmed!",
      selectDate: "Choose a date",
      today: "Today",
      selectTime: "Choose a time",
      unavailableHint:
        "Crossed-out times are unavailable",
      timeAccessibility: "Time {time}",
      selectedService: "SELECTED SERVICE",
      changeService: "Change service",
      summary: "Summary",
      service: "Service",
      date: "Date",
      time: "Time",
      total: "Total",
      confirm: "Confirm booking",
    },
    profile: {
      title: "Profile",
      description:
        "Manage your account and preferences.",
      signOut: "Sign out",
      preferences: "Preferences",
      language: "Language",
      customer: "Customer",
      emailUnavailable: "Email unavailable",
      information: "Information",
      aboutShop: "About the shop",
      aboutShopDescription:
        "Contact, address and social media",
      openAboutShop: "Open shop information",
      privacy: "Privacy policy",
      terms: "Terms of use",
      appVersion: "App version",
    },
    business: {
      title: "About the shop",
      description:
        "Contact or find Behar Barber.",
      businessContact: "Business contact",
      barber: "Barber: {name}",
      address: "Address",
      phone: "Phone",
      email: "Email",
      instagram: "Instagram",
      openLocation: "Open location",
      openContact: "Open {label}: {value}",
      noContactInformation:
        "Contact information has not been configured yet.",
      loading: "Loading business information...",
      loadError:
        "Business information could not be loaded.",
      retry: "Try again",
      linkErrorTitle:
        "Link could not be opened",
      linkErrorMessage:
        "We could not open this link. Please try again.",
    },
    legal: {
      privacyTitle: "Privacy policy",
      privacyDescription:
        "Learn how we use and protect your information.",
      dataCollectedTitle:
        "Information we collect",
      dataCollectedBody:
        "We store basic account information, such as your name and email, together with information about appointments you book.",
      dataUsageTitle:
        "How we use information",
      dataUsageBody:
        "Information is used for account access, booking and managing appointments, and communicating important updates.",
      dataProtectionTitle: "Data protection",
      dataProtectionBody:
        "Authentication is managed through Clerk, while application data is stored by the Behar Barber backend systems.",
      userChoicesTitle: "Your choices",
      userChoicesBody:
        "You may request correction or deletion of your information by contacting Behar Barber.",
      termsTitle: "Terms of use",
      termsDescription:
        "Basic rules for using the application and booking appointments.",
      bookingTitle: "Bookings",
      bookingBody:
        "Choose the service, date and time carefully. An appointment is booked once confirmation appears in the application.",
      cancellationTitle: "Cancellations",
      cancellationBody:
        "If you cannot attend, cancel your appointment as early as possible so the time can become available.",
      availabilityTitle: "Availability",
      availabilityBody:
        "Time slots depend on working hours, blocked periods and existing appointments. Availability may change.",
      responsibleUseTitle: "Responsible use",
      responsibleUseBody:
        "Do not create false bookings or use another person's account without permission.",
    },
    feedback: {
      seeYouSoon: "See you soon!",
    },
  },
} as const satisfies Record<
  AppLanguage,
  Record<string, Record<string, string>>
>;

type TranslationSection =
  keyof typeof translations.sq;

export type TranslationKey = {
  [Section in TranslationSection]:
    `${Section}.${keyof typeof translations.sq[Section] & string}`;
}[TranslationSection];

export const serviceNameTranslations: Record<
  string,
  Record<AppLanguage, string>
> = {
  Qethje: {
    sq: "Qethje",
    en: "Haircut",
  },
  Fade: {
    sq: "Fade",
    en: "Fade",
  },
  "Qethje fëmijësh": {
    sq: "Qethje fëmijësh",
    en: "Kids' haircut",
  },
  Rroje: {
    sq: "Rroje",
    en: "Shave",
  },
  "Formësim i mjekrës": {
    sq: "Formësim i mjekrës",
    en: "Beard shaping",
  },
  Stilim: {
    sq: "Stilim",
    en: "Styling",
  },
};