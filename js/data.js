// পরিবারের তথ্য — এখানে নাম বদলালে পুরো সাইট আপডেট হবে।
// photo: "images/people/xxx.jpg" দিলে ছবি দেখাবে, না দিলে ডিফল্ট অ্যাভাটার। (ছবি images/people/ ফোল্ডারে রাখুন)
const FAMILY = {
  father: { name: "মোঃ ফছির উদ্দিন", photo: "images/people/fosir-uddin.jpg", gender: "m", role: "পিতা" },
  mother: { name: "মোছাঃ রাবেয়া বেগম", photo: "images/people/rabeya-begum.jpg", gender: "f", role: "মাতা" },
  children: [
    { order: "১ম", name: "মোছাঃ সেলিনা বেগম", gender: "f", kids: [
      { name: "মোঃ রুহুল আমীন", gender: "m" }, { name: "মোঃ তিতুমীর", gender: "m" },
      { name: "মোছাঃ শিলা", gender: "f" } ] },
    { order: "২য়", name: "মোছাঃ শাহানাজ বেগম", gender: "f", kids: [
      { name: "মোঃ তামিম", gender: "m" }, { name: "মোঃ সাঈম", gender: "m" }, { name: "মোছাঃ সুমাইয়া", gender: "f" }, { name: "মোছাঃ সাফিয়া", gender: "f" } ] },
    { order: "৩য়", name: "মোঃ রবিউল ইসলাম", gender: "m", kids: [
      { name: "মোছাঃ সুরাইয়া জাহান প্রেরণা", gender: "f" }, { name: "মোঃ কাউছার আহমেদ", photo: "images/people/kausar.jpg", gender: "m" } ] },
    { order: "৪র্থ", name: "মোঃ আব্দুর রব", photo: "images/people/abdur-rob.jpg", gender: "m", kids: [ { name: "মোঃ রাফি", gender: "m" } ] },
    { order: "৫ম", name: "মোঃ রেজওয়ান প্রামাণিক", photo: "images/people/rezwan.jpg", gender: "m", kids: [
      { name: "মোছাঃ মরিয়ম", gender: "f" }, { name: "মোঃ সুলাইমান", gender: "m" }, { name: "মোঃ হুযাইফা", gender: "m" } ] },
    { order: "৬ষ্ঠ", name: "মোঃ আব্দুর রহমান", gender: "m", kids: [
      { name: "মোঃ সালমান রহমান বর্ণ", photo: "images/people/salman-borno.jpg", gender: "m" }, { name: "মোছা: অনন্যা", gender: "f" } ] },
    { order: "৭ম", name: "মোঃ রইচ উদ্দিন", photo: "images/people/roich-uddin.jpg", gender: "m", kids: [
      { name: "মোঃ আবু তালহা", gender: "m" }, { name: "মোছাঃ ছোঁয়া", photo: "images/people/choya.jpg", gender: "f" } ] },
    { order: "৮ম", name: "মোছাঃ কণা খাতুন ", gender: "f", kids: [
      { name: "মোঃ ফাহাদ", photo: "images/people/fahad.jpg", gender: "m" }, { name: "মোঃ রাদ", photo: "images/people/rad.jpg", gender: "m" }, { name: "মোঃ আহনাফ", photo: "images/people/ahnaf.jpg", gender: "m" } ] }
  ]
};
