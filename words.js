// ============================================================
// ملف الأسئلة: عدّل هنا فقط، ولا تلمس index.html
// ------------------------------------------------------------
// شكل كل كلمة أو جملة:   "الألماني|العربي"
//   مثال:        "die Katze|قطة"      (اسم مع أداة التعريف)
//   مثال:        "schnell|سريع"       (كلمة بدون أداة)
//   مثال جملة:   "Ich habe Hunger.|أنا جائع"
//
// نوع المستوى t:
//   "w"  كلمات   (نصف الأسئلة عربي←ألماني ونصفها ألماني←عربي)
//   "a"  أدوات التعريف (اختيار der / die / das)، ولازم كل كلمة تبدأ بـ der أو die أو das
//   "s"  جمل
// tm = وقت السؤال بالثواني (اختياري). g = 3 هو قسم "صعب جدا"
//
// g = رقم القسم في GROUPS (0 كلمات، 1 أدوات التعريف، 2 جمل)
// e = الإيموجي، n = اسم المستوى
//
// لإضافة مستوى جديد: انسخ سطرًا كاملًا من LEVELS وضعه في المكان المناسب
// (لا تنس الفاصلة , في آخر السطر)، وغيّر الاسم والكلمات.
// كل مستوى يحتاج 10 كلمات على الأقل. لو وضعت أكثر من 10 يختار التطبيق 10 عشوائيًا في كل مرة.
// ============================================================

const GROUPS=["كلمات","أدوات التعريف (der / die / das)","جمل","صعب جدا 🔥"];

const LEVELS=[
{g:0,n:"التحيات",e:"👋",t:"w",w:["Hallo|مرحبا","Danke|شكرا","Bitte|من فضلك","Ja|نعم","Nein|لا","Tschüss|وداعا","Guten Morgen|صباح الخير","Gute Nacht|تصبح على خير","Entschuldigung|آسف","Willkommen|أهلا بك"]},
{g:0,n:"الأرقام",e:"🔢",t:"w",w:["eins|واحد","zwei|اثنان","drei|ثلاثة","vier|أربعة","fünf|خمسة","sechs|ستة","sieben|سبعة","acht|ثمانية","neun|تسعة","zehn|عشرة"]},
{g:0,n:"الطعام",e:"🍞",t:"w",w:["das Wasser|ماء","das Brot|خبز","die Milch|حليب","der Apfel|تفاحة","das Fleisch|لحم","der Käse|جبن","der Reis|أرز","der Kaffee|قهوة","das Ei|بيضة","der Fisch|سمك"]},
{g:0,n:"العائلة",e:"👨‍👩‍👧",t:"w",w:["der Vater|أب","die Mutter|أم","der Bruder|أخ","die Schwester|أخت","der Sohn|ابن","die Tochter|ابنة","der Großvater|جد","die Großmutter|جدة","das Kind|طفل","der Freund|صديق"]},
{g:0,n:"الأفعال",e:"🏃",t:"w",w:["gehen|يذهب","kommen|يأتي","essen|يأكل","trinken|يشرب","lernen|يتعلم","sprechen|يتكلم","schlafen|ينام","lesen|يقرأ","schreiben|يكتب","arbeiten|يعمل"]},
{g:0,n:"أشياء وأماكن",e:"🏠",t:"w",w:["das Haus|بيت","die Schule|مدرسة","die Stadt|مدينة","das Auto|سيارة","das Buch|كتاب","der Tisch|طاولة","die Straße|شارع","die Arbeit|عمل","die Zeit|وقت","der Hund|كلب"]},
{g:0,n:"الألوان",e:"🎨",t:"w",w:["rot|أحمر","blau|أزرق","grün|أخضر","gelb|أصفر","schwarz|أسود","weiß|أبيض","braun|بني","grau|رمادي","orange|برتقالي","rosa|وردي"]},
{g:0,n:"الجسم",e:"🧍",t:"w",w:["der Kopf|رأس","die Hand|يد","das Auge|عين","das Ohr|أذن","die Nase|أنف","der Mund|فم","der Fuß|قدم","das Herz|قلب","der Arm|ذراع","das Bein|ساق"]},
{g:0,n:"الأيام والوقت",e:"📅",t:"w",w:["Montag|الاثنين","Dienstag|الثلاثاء","Mittwoch|الأربعاء","Donnerstag|الخميس","Freitag|الجمعة","Samstag|السبت","Sonntag|الأحد","heute|اليوم","morgen|غدا","gestern|أمس"]},
{g:0,n:"الصفات",e:"↔️",t:"w",w:["groß|كبير","klein|صغير","neu|جديد","alt|قديم","gut|جيد","schlecht|سيء","schnell|سريع","langsam|بطيء","heiß|حار","kalt|بارد"]},

{g:1,n:"أدوات التعريف ١",e:"📘",t:"a",w:["die Mutter|أم","das Brot|خبز","der Vater|أب","der Tisch|طاولة","die Schule|مدرسة","das Kind|طفل","das Auto|سيارة","die Stadt|مدينة","der Hund|كلب","das Buch|كتاب"]},
{g:1,n:"أدوات التعريف ٢",e:"📗",t:"a",w:["das Ei|بيضة","das Herz|قلب","die Nase|أنف","der Fuß|قدم","das Wasser|ماء","die Tochter|ابنة","der Sohn|ابن","der Fisch|سمك","die Arbeit|عمل","der Reis|أرز"]},

{g:2,n:"جمل التعارف",e:"💬",t:"s",w:["Ich heiße Ahmed.|اسمي أحمد","Wie geht es dir?|كيف حالك؟","Mir geht es gut.|أنا بخير","Ich komme aus Ägypten.|أنا من مصر","Ich spreche Arabisch.|أنا أتكلم العربية","Ich lerne Deutsch.|أنا أتعلم الألمانية","Woher kommst du?|من أين أنت؟","Wie heißt du?|ما اسمك؟","Ich verstehe nicht.|أنا لا أفهم","Sprichst du Englisch?|هل تتكلم الإنجليزية؟"]},
{g:2,n:"جمل يومية",e:"☕",t:"s",w:["Ich habe Hunger.|أنا جائع","Ich habe Durst.|أنا عطشان","Wo ist die Toilette?|أين الحمام؟","Wie viel kostet das?|كم يكلف هذا؟","Ich möchte einen Kaffee.|أريد قهوة","Das Wasser ist kalt.|الماء بارد","Das Essen ist gut.|الطعام جيد","Ich gehe nach Hause.|أنا ذاهب إلى البيت","Ich liebe dich.|أحبك","Bis morgen!|أراك غدا"]},
{g:2,n:"جمل بسيطة",e:"📝",t:"s",w:["Der Vater arbeitet heute.|الأب يعمل اليوم","Die Mutter kocht Reis.|الأم تطبخ الأرز","Das Kind schläft.|الطفل ينام","Der Hund ist groß.|الكلب كبير","Das Auto ist neu.|السيارة جديدة","Ich lese ein Buch.|أنا أقرأ كتابا","Wir essen Brot.|نحن نأكل الخبز","Die Schule ist klein.|المدرسة صغيرة","Mein Bruder ist schnell.|أخي سريع","Ich sehe das Haus.|أنا أرى البيت"]},
{g:3,n:"مفردات مجردة",e:"🧠",t:"w",tm:6,w:["die Verantwortung|مسؤولية","die Gesellschaft|مجتمع","die Erfahrung|خبرة","die Entscheidung|قرار","die Gelegenheit|فرصة","die Herausforderung|تحدٍّ","das Verständnis|تفهّم","die Umwelt|بيئة","die Beziehung|علاقة","die Meinung|رأي"]},
{g:3,n:"أفعال متقدمة",e:"⚡",t:"w",tm:6,w:["verbessern|يحسّن","vermeiden|يتجنب","erreichen|يحقق","entscheiden|يقرر","verlangen|يطالب","behaupten|يزعم","bezweifeln|يشك في","erwähnen|يذكر","unterstützen|يدعم","überzeugen|يُقنع"]},
{g:3,n:"أفعال قابلة للفصل",e:"🔧",t:"w",tm:6,w:["aufstehen|ينهض","anrufen|يتصل هاتفيا","einladen|يدعو","mitbringen|يحضر معه","ausgeben|ينفق","abholen|يستلم","aufgeben|يستسلم","einkaufen|يتسوق","anfangen|يبدأ","zurückkommen|يعود"]},
{g:3,n:"صفات وظروف متقدمة",e:"🎯",t:"w",tm:6,w:["wahrscheinlich|على الأرجح","trotzdem|مع ذلك","übrigens|بالمناسبة","ausreichend|كافٍ","wesentlich|جوهري","zuverlässig|موثوق","gleichzeitig|في الوقت نفسه","ungefähr|تقريبا","vorsichtig|حذر","ehrlich|صادق"]},
{g:3,n:"أدوات التعريف الصعبة ١",e:"🔥",t:"a",tm:5,w:["das Mädchen|فتاة","die Sonne|شمس","der Mond|قمر","die Gesundheit|صحة","das Ergebnis|نتيجة","die Freiheit|حرية","das Gemüse|خضار","das Datum|تاريخ","der Tod|موت","die Mehrheit|أغلبية"]},
{g:3,n:"أدوات التعريف الصعبة ٢",e:"💎",t:"a",tm:5,w:["das Ende|نهاية","der Name|اسم","der Gedanke|فكرة","die Wirtschaft|اقتصاد","das Gebiet|منطقة","die Mitte|وسط","das Ziel|هدف","der Schmerz|ألم","die Aufgabe|مهمة","das Ereignis|حدث"]},
{g:3,n:"جمل فرعية",e:"🧩",t:"s",tm:14,w:["Ich weiß nicht, ob er kommt.|لا أعرف إن كان سيأتي","Wenn es regnet, bleibe ich zu Hause.|إذا أمطرت، أبقى في البيت","Ich bleibe zu Hause, weil ich krank bin.|أبقى في البيت لأنني مريض","Er sagt, dass er keine Zeit hat.|يقول إنه ليس لديه وقت","Ich lerne Deutsch, damit ich in Deutschland arbeiten kann.|أتعلم الألمانية لكي أعمل في ألمانيا","Obwohl es kalt ist, gehen wir spazieren.|رغم أن الجو بارد، نخرج للتنزه","Als ich klein war, wohnte ich in Kairo.|عندما كنت صغيرا، كنت أسكن في القاهرة","Ich frage mich, wo er wohnt.|أتساءل أين يسكن","Bevor du gehst, ruf mich an.|قبل أن تذهب، اتصل بي","Nachdem er gegessen hatte, ging er schlafen.|بعد أن أكل، ذهب لينام"]},
{g:3,n:"جمل الشرط والتمنّي",e:"🌙",t:"s",tm:14,w:["Wenn ich Zeit hätte, würde ich dich besuchen.|لو كان عندي وقت لزرتك","Ich hätte gern ein Glas Wasser.|أود كوبا من الماء","Könnten Sie mir bitte helfen?|هل يمكنك مساعدتي من فضلك؟","Wenn ich reich wäre, würde ich reisen.|لو كنت غنيا لسافرت","Er tut so, als ob er alles wüsste.|يتظاهر كأنه يعرف كل شيء","Ich wünschte, ich könnte fliegen.|أتمنى لو كنت أستطيع الطيران","An deiner Stelle würde ich das nicht tun.|لو كنت مكانك لما فعلت ذلك","Hätte ich das gewusst, wäre ich gekommen.|لو علمت ذلك لحضرت","Es wäre schön, wenn du kommen könntest.|سيكون جميلا لو استطعت المجيء","Ich würde gern mehr Deutsch sprechen.|أود أن أتكلم الألمانية أكثر"]},
{g:3,n:"تعابير ألمانية",e:"🗣️",t:"s",tm:14,w:["Das ist mir Wurst.|لا يهمني هذا","Ich verstehe nur Bahnhof.|لا أفهم شيئا","Ich drücke dir die Daumen.|أتمنى لك الحظ","Das ist nicht mein Bier.|هذا ليس من شأني","Jetzt ist der Groschen gefallen.|الآن فهمت","Das Leben ist kein Ponyhof.|الحياة ليست نزهة","Ich habe die Nase voll.|لقد مللت وطفح الكيل","Er hat Schwein gehabt.|كان محظوظا","Da liegt der Hund begraben.|هنا تكمن المشكلة","Ich bin Feuer und Flamme.|أنا متحمس جدا"]},
{g:3,n:"جمل رسمية وعمل",e:"💼",t:"s",tm:14,w:["Ich möchte mich um die Stelle bewerben.|أود التقدم لهذه الوظيفة","Bitte schicken Sie mir die Unterlagen zu.|من فضلك أرسل لي المستندات","Ich habe einen Termin beim Arzt.|لدي موعد عند الطبيب","Leider muss ich den Termin verschieben.|للأسف يجب أن أؤجل الموعد","Vielen Dank für Ihre schnelle Antwort.|شكرا جزيلا على ردكم السريع","Ich würde gern ein Konto eröffnen.|أود فتح حساب","Die Miete ist zu hoch für mich.|الإيجار مرتفع جدا بالنسبة لي","Ich brauche eine Aufenthaltserlaubnis.|أحتاج إلى تصريح إقامة","Können Sie das bitte wiederholen?|هل يمكنك تكرار ذلك من فضلك؟","Ich bin mit dem Ergebnis nicht zufrieden.|لست راضيا عن النتيجة"]}
];
