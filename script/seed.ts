import { PrismaClient, Specialty, User, ProposalStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { auth } from "@/api/auth/index.auth";

const prisma = new PrismaClient();
type NewUser = Parameters<typeof auth.api.signUpEmail>["0"]["body"];

// Array of predefined teachers
const predefinedTeachers: Partial<NewUser>[] = [
  {
    name: "أحمد عبد الله",
    email: "ahmed.abdullah@example.com",
    role: "teacher",
  },
  {
    name: "محمد علي",
    email: "mohammed.ali@example.com",
    role: "teacher",
  },
  {
    name: "سارة إبراهيم",
    email: "sara.ibrahim@example.com",
    role: "teacher",
  },
  {
    name: "فاطمة الزهراء",
    email: "fatima.zahra@example.com",
    role: "teacher",
  },
  {
    name: "يوسف خالد",
    email: "youssef.khaled@example.com",
    role: "teacher",
  },
];

// Array of predefined students
const predefinedStudents: Partial<NewUser>[] = [
  {
    name: "عمر حسن",
    email: "omar.hassan@example.com",
    role: "student",
    registerationNumber: "212135000001",
    specialty: Specialty.L3_SI,
  },
  {
    name: "ليلى كريم",
    email: "leila.karim@example.com",
    role: "student",
    registerationNumber: "212135000002",
    specialty: Specialty.L3_ISIL,
  },
  {
    name: "كريم مصطفى",
    email: "karim.mustafa@example.com",
    role: "student",
    registerationNumber: "212135000003",
    specialty: Specialty.M2_SIGL,
  },
  {
    name: "نور الهدى",
    email: "nour.elhoda@example.com",
    role: "student",
    registerationNumber: "212135000004",
    specialty: Specialty.M2_IDO,
  },
  {
    name: "زكرياء محمد",
    email: "zakaria.mohammed@example.com",
    role: "student",
    registerationNumber: "212135000005",
    specialty: Specialty.M2_RTIC,
  },
  {
    name: "أمينة عبد الرحمن",
    email: "amina.abderrahman@example.com",
    role: "student",
    registerationNumber: "212135000006",
    specialty: Specialty.M2_IA,
  },
  {
    name: "ياسمين سليم",
    email: "yasmine.salim@example.com",
    role: "student",
    registerationNumber: "212135000007",
    specialty: Specialty.L3_SI,
  },
  {
    name: "إلياس مراد",
    email: "ilyas.mourad@example.com",
    role: "student",
    registerationNumber: "212135000008",
    specialty: Specialty.L3_ISIL,
  },
  {
    name: "سلمى عادل",
    email: "salma.adel@example.com",
    role: "student",
    registerationNumber: "212135000009",
    specialty: Specialty.M2_SIGL,
  },
  {
    name: "أنس رياض",
    email: "anas.riyad@example.com",
    role: "student",
    registerationNumber: "212135000010",
    specialty: Specialty.M2_IDO,
  },
];

// Create accounts for users
const createAccountsForUsers = async (users: NewUser[]) => {
  const accounts = [];

  for (const user of users) {
    const account = await auth.api.signUpEmail({
      body: user,
    });

    accounts.push(account.user);
  }

  return accounts;
};

// Create projects for teachers
const createProjectsForTeachers = async (
  teachers: User[],
  projectsPerTeacher: number
) => {
  const categoryList = [
    "ذكاء اصطناعي",
    "برمجة ويب",
    "تطبيق حاسوب",
    "تطبيق موبايل",
  ];

  // Project title templates by category
  const projectTitlesByCategory: Record<string, string[]> = {
    "ذكاء اصطناعي": [
      "نظام توصية باستخدام التعلم العميق",
      "تحليل المشاعر من النصوص العربية",
      "التعرف على الصور باستخدام الشبكات العصبية",
      "نظام محادثة ذكي للمساعدة الأكاديمية",
      "التنبؤ بالاحتياجات التعليمية باستخدام تقنيات التعلم الآلي",
      "تطوير خوارزميات الرؤية الحاسوبية للتعرف على الأشياء",
      "نموذج تصنيف البيانات للكشف عن الاحتيال",
    ],
    "برمجة ويب": [
      "منصة تعليمية تفاعلية للطلاب",
      "موقع إدارة المشاريع الأكاديمية",
      "بوابة إلكترونية للخدمات الجامعية",
      "نظام إدارة المحتوى التعليمي",
      "موقع لتبادل الموارد العلمية",
      "منصة للتدريب عن بعد",
      "نظام إلكتروني لإدارة الندوات والمؤتمرات",
    ],
    "تطبيق حاسوب": [
      "برنامج مساعد للتحليل الإحصائي",
      "نظام آلي لتصحيح الاختبارات",
      "برنامج محاكاة للتجارب المعملية",
      "تطبيق سطح مكتب لإدارة المراجع العلمية",
      "برنامج لتحليل وتصور البيانات",
      "نظام مراقبة أداء الطلاب",
      "برنامج تعليمي تفاعلي للغات البرمجة",
    ],
    "تطبيق موبايل": [
      "تطبيق للجدول الدراسي والمهام",
      "تطبيق جوال للتعلم التفاعلي",
      "منصة موبايل للوصول للموارد التعليمية",
      "تطبيق للاختبارات والتقييمات",
      "تطبيق للتواصل بين الطلاب والأساتذة",
      "تطبيق لإدارة المشاريع الدراسية",
      "منصة موبايل للأنشطة الطلابية",
    ],
    "unknown": [
      "مشروع بحثي عام",
      "دراسة تحليلية",
      "تطوير نظام معلومات",
      "مشروع تقني متكامل",
    ],
  };
  
  // Generate detailed project description based on category and title
  const generateProjectDescription = (category: string, title: string): string => {
    const descriptionsByCategory: Record<string, Record<string, string>> = {
      "ذكاء اصطناعي": {
        "نظام توصية باستخدام التعلم العميق": "تطوير نظام توصية متقدم يستخدم تقنيات التعلم العميق لتحليل سلوك المستخدمين واهتماماتهم. يتضمن المشروع جمع البيانات وتنظيفها، بناء نماذج LSTM أو Transformer، وتقييم أداء التوصيات باستخدام مقاييس دقة مختلفة. سيتم تطبيق النظام لتوصية المقررات الدراسية للطلاب بناءً على تفضيلاتهم السابقة والمسارات الأكاديمية الناجحة.",
        "تحليل المشاعر من النصوص العربية": "تطوير نظام لتحليل المشاعر من النصوص العربية باستخدام تقنيات معالجة اللغة الطبيعية والتعلم العميق. سيتضمن المشروع بناء مجموعة بيانات مصنفة، تدريب نماذج التعلم الآلي (مثل BERT المعدل للغة العربية)، وتطوير واجهة برمجية لتحليل النصوص. يستهدف المشروع تطبيقات تحليل آراء الطلاب حول المقررات التعليمية.",
        "التعرف على الصور باستخدام الشبكات العصبية": "تصميم وتنفيذ نظام للتعرف على محتوى الصور باستخدام الشبكات العصبية التلافيفية (CNNs). سيشمل المشروع اختيار وتدريب نماذج الرؤية الحاسوبية مثل ResNet أو EfficientNet، تحسين أدائها للتعرف على أنواع محددة من الصور، وبناء تطبيق يمكن استخدامه في بيئة تعليمية لتصنيف المحتوى البصري.",
        "نظام محادثة ذكي للمساعدة الأكاديمية": "تطوير روبوت محادثة ذكي قادر على تقديم المساعدة الأكاديمية للطلاب. سيستخدم المشروع نماذج لغوية كبيرة مع تعديلها لتناسب السياق التعليمي المحدد. سيتضمن تصميم قاعدة معرفية أكاديمية، تطوير آليات للحوار الطبيعي، ودمج النظام مع منصات التعلم الإلكتروني.",
        "التنبؤ بالاحتياجات التعليمية باستخدام تقنيات التعلم الآلي": "بناء نظام تنبؤي يستخدم تقنيات التعلم الآلي لتحديد احتياجات الطلاب التعليمية المستقبلية. سيتضمن المشروع تحليل البيانات التاريخية للطلاب، تطوير خوارزميات تنبؤية، وإنشاء لوحة تحكم تفاعلية للمعلمين. الهدف هو تحسين تخصيص الموارد التعليمية وتقديم دعم استباقي للطلاب المعرضين للخطر.",
        "تطوير خوارزميات الرؤية الحاسوبية للتعرف على الأشياء": "تصميم وتنفيذ خوارزميات رؤية حاسوبية متقدمة للتعرف على الأشياء في البيئة التعليمية. سيستخدم المشروع تقنيات مثل YOLO أو Faster R-CNN مع تحسينها لتناسب حالات الاستخدام التعليمية. التطبيقات المستهدفة تشمل أنظمة مراقبة الحضور الذكية، أو التعرف التلقائي على المعدات المختبرية.",
        "نموذج تصنيف البيانات للكشف عن الاحتيال": "تطوير نموذج تصنيف متقدم باستخدام تقنيات التعلم الآلي للكشف عن أنماط الاحتيال الأكاديمي. سيتضمن المشروع تحليل بيانات متنوعة، استخراج الميزات، بناء وتدريب عدة نماذج مرشحة، وتقييم أدائها. سيتم تطبيق النموذج في سياق التحقق من أصالة الأعمال الأكاديمية والاختبارات عبر الإنترنت."
      },
      "برمجة ويب": {
        "منصة تعليمية تفاعلية للطلاب": "تطوير منصة ويب تعليمية شاملة تتيح التفاعل المباشر بين الطلاب والمدرسين. ستشمل المنصة نظام إدارة محتوى متكامل، غرف دراسة افتراضية، أدوات للتقييم والواجبات، ولوحات مناقشة. سيتم استخدام تقنيات React و Node.js مع قاعدة بيانات MongoDB، وتكامل مع خدمات التعرف على الكلام والصورة.",
        "موقع إدارة المشاريع الأكاديمية": "تصميم وبناء نظام ويب متكامل لإدارة المشاريع الأكاديمية من مرحلة الاقتراح حتى التقييم النهائي. سيتضمن المشروع واجهات للطلاب والأساتذة والمشرفين، أدوات لتتبع التقدم، نظام للمراجعات الدورية، وآليات للتقييم والتغذية الراجعة. سيستخدم المشروع Next.js مع TypeScript وPrisma ORM.",
        "بوابة إلكترونية للخدمات الجامعية": "إنشاء بوابة ويب شاملة توفر وصولاً مركزياً لجميع الخدمات الجامعية. ستتضمن البوابة أنظمة للتسجيل الأكاديمي، إدارة الرسوم، طلبات الوثائق، وجدولة المواعيد. سيتم بناء واجهة متجاوبة باستخدام Angular مع Laravel في الخلفية وتكامل مع أنظمة الدفع الإلكتروني.",
        "نظام إدارة المحتوى التعليمي": "تطوير نظام إدارة محتوى تعليمي متخصص يتيح للمعلمين إنشاء ومشاركة وإدارة المواد التعليمية الرقمية. سيشمل النظام محرر محتوى WYSIWYG متقدم، دعم للوسائط المتعددة، نظام تصنيف ذكي، وإمكانات مشاركة وتتبع استخدام المحتوى. سيتم استخدام Vue.js مع GraphQL API.",
        "موقع لتبادل الموارد العلمية": "بناء منصة ويب تعاونية لتبادل الموارد والأبحاث العلمية بين الطلاب والباحثين. ستتضمن المنصة نظام تصنيف متقدم، بحث معنوي، مكتبة رقمية، وأدوات للاقتباس والمراجع. سيتم استخدام Django مع React وElasticsearch للبحث المتقدم.",
        "منصة للتدريب عن بعد": "تطوير منصة ويب للتدريب عن بعد تدعم الدورات المباشرة والمسجلة. ستشمل المنصة نظام لجدولة الجلسات، البث المباشر مع التفاعل، أدوات للتقييم، وشهادات رقمية. سيتم استخدام تقنيات WebRTC مع React و Express.js وقواعد بيانات PostgreSQL.",
        "نظام إلكتروني لإدارة الندوات والمؤتمرات": "إنشاء نظام ويب متكامل لإدارة الندوات والمؤتمرات الأكاديمية. سيتضمن النظام تسجيل المشاركين، إدارة الجدولة، تقديم وتحكيم الأوراق البحثية، وإصدار الشهادات. سيتم بناء النظام باستخدام Spring Boot مع React وAWS للخدمات السحابية."
      },
      "تطبيق حاسوب": {
        "برنامج مساعد للتحليل الإحصائي": "تطوير تطبيق سطح مكتب متقدم للتحليل الإحصائي موجه للباحثين والطلاب. سيوفر البرنامج واجهة سهلة الاستخدام لإجراء التحليلات المعقدة، مع دعم للنماذج الإحصائية المتنوعة، عرض بصري للبيانات، وتصدير النتائج بتنسيقات مختلفة. سيتم تطويره باستخدام Python مع PyQt وSciKit-learn.",
        "نظام آلي لتصحيح الاختبارات": "تصميم وبناء برنامج حاسوبي لتصحيح الاختبارات تلقائياً باستخدام تقنيات التعرف البصري وتحليل النصوص. سيشمل البرنامج واجهة لإنشاء نماذج الاختبارات، مسح وتحليل الإجابات، ونظام تقييم مرن. سيتم استخدام C# مع .NET و OpenCV للتعرف البصري.",
        "برنامج محاكاة للتجارب المعملية": "إنشاء برنامج محاكاة متقدم للتجارب المعملية يمكن الطلاب من إجراء تجارب افتراضية واقعية. سيتضمن البرنامج محاكيات دقيقة للأجهزة المختبرية، تفاعلات كيميائية وفيزيائية واقعية، وأدوات لتسجيل النتائج وتحليلها. سيتم تطويره باستخدام Unity3D مع C#.",
        "تطبيق سطح مكتب لإدارة المراجع العلمية": "تطوير برنامج متخصص لإدارة وتنظيم المراجع العلمية والاقتباسات. سيشمل البرنامج آليات استيراد المراجع من مصادر متعددة، تنظيم وتصنيف مخصص، توليد الاقتباسات بأنماط مختلفة، وتكامل مع معالجات النصوص. سيتم بناؤه باستخدام Electron مع React وSQLite.",
        "برنامج لتحليل وتصور البيانات": "بناء تطبيق سطح مكتب قوي لتحليل وتصور البيانات العلمية المعقدة. سيوفر البرنامج أدوات لاستيراد ومعالجة مجموعات البيانات الكبيرة، تطبيق تحليلات متقدمة، وإنشاء عروض بصرية تفاعلية. سيتم تطويره باستخدام Java مع JavaFX وApache Commons Math.",
        "نظام مراقبة أداء الطلاب": "تطوير نظام سطح مكتب شامل لمراقبة وتحليل أداء الطلاب عبر مختلف المؤشرات الأكاديمية. سيتضمن النظام لوحات تحكم تحليلية، تتبع للتقدم الدراسي، إنذارات آلية، وتقارير مخصصة. سيتم بناؤه باستخدام WPF مع C# وSQL Server.",
        "برنامج تعليمي تفاعلي للغات البرمجة": "إنشاء تطبيق سطح مكتب تعليمي تفاعلي لتعلم لغات البرمجة المختلفة. سيشمل البرنامج دروس منظمة، بيئة تطوير متكاملة مبسطة، تحديات عملية، وتقييم فوري للكود. سيتم تطويره باستخدام Qt مع C++ ودعم للمترجمات والمفسرات المتعددة."
      },
      "تطبيق موبايل": {
        "تطبيق للجدول الدراسي والمهام": "تطوير تطبيق موبايل متكامل لإدارة الجدول الدراسي والمهام الأكاديمية. سيوفر التطبيق عرض مخصص للجدول الدراسي، تتبع المهام والمواعيد النهائية، تنبيهات ذكية، ومزامنة مع التقويم. سيتم تطويره باستخدام Flutter لدعم منصتي Android و iOS مع Firebase للبيانات السحابية.",
        "تطبيق جوال للتعلم التفاعلي": "بناء تطبيق موبايل للتعلم التفاعلي يجمع بين المحتوى التعليمي والألعاب التحفيزية. سيتضمن التطبيق مسارات تعلم مخصصة، اختبارات تفاعلية، عناصر تلعيب، وتحديات بين الأقران. سيتم تطويره باستخدام React Native مع Redux وAWS Amplify.",
        "منصة موبايل للوصول للموارد التعليمية": "تصميم منصة موبايل توفر وصولاً سهلاً للموارد التعليمية المتنوعة. ستشمل المنصة مكتبة رقمية شاملة، بحث متقدم، تنزيل للاستخدام دون اتصال، وإمكانية مشاركة الملاحظات. سيتم تطويرها باستخدام Kotlin لنظام Android و Swift لنظام iOS مع MongoDB Realm.",
        "تطبيق للاختبارات والتقييمات": "تطوير تطبيق موبايل متخصص للاختبارات والتقييمات الأكاديمية. سيوفر التطبيق أدوات لإنشاء الاختبارات، دعم لأنواع أسئلة متعددة، آلية تصحيح آلي، وتحليل مفصل للنتائج. سيتم بناؤه باستخدام Ionic مع Angular وFirebase.",
        "تطبيق للتواصل بين الطلاب والأساتذة": "إنشاء تطبيق موبايل يسهل التواصل الفعال بين الطلاب والأساتذة. سيتضمن التطبيق محادثات فردية وجماعية، مشاركة الملفات، جدولة المواعيد، وإشعارات فورية. سيتم تطويره باستخدام Xamarin مع C# وSignalR للاتصال الفوري.",
        "تطبيق لإدارة المشاريع الدراسية": "بناء تطبيق موبايل لإدارة المشاريع الدراسية الجماعية. سيوفر التطبيق أدوات لتقسيم المهام، تتبع التقدم، مشاركة الموارد، والتواصل بين أعضاء الفريق. سيتم تطويره باستخدام SwiftUI لنظام iOS و Jetpack Compose لنظام Android مع Firebase.",
        "منصة موبايل للأنشطة الطلابية": "تطوير منصة موبايل متكاملة لإدارة وتنظيم الأنشطة الطلابية. ستشمل المنصة تقويم للفعاليات، تسجيل المشاركين، تنظيم المجموعات، ومشاركة الصور والتقارير. سيتم بناؤها باستخدام Flutter مع Supabase للخدمات الخلفية."
      },
      "unknown": {
        "مشروع بحثي عام": "إجراء دراسة بحثية شاملة في مجال متخصص، تتضمن مراجعة الأدبيات السابقة، جمع وتحليل البيانات، واستخلاص النتائج والتوصيات. سيشمل المشروع منهجية بحث دقيقة، أدوات قياس مناسبة، وتحليل إحصائي متقدم. المخرجات ستتضمن ورقة بحثية قابلة للنشر وعرض تقديمي للنتائج.",
        "دراسة تحليلية": "إجراء دراسة تحليلية معمقة لظاهرة أو مشكلة محددة، تتضمن تحليل البيانات الكمية والنوعية، تحديد الاتجاهات والأنماط، واستخلاص الرؤى القيمة. سيتم استخدام منهجيات تحليلية متقدمة مع التركيز على تقديم حلول عملية ومبتكرة.",
        "تطوير نظام معلومات": "تصميم وتنفيذ نظام معلومات متكامل لتحسين عمليات محددة. سيشمل المشروع تحليل المتطلبات، تصميم النظام، التطوير والاختبار، والتوثيق الشامل. سيتم التركيز على سهولة الاستخدام، الأمان، والقابلية للتوسع المستقبلي.",
        "مشروع تقني متكامل": "تطوير حل تقني متكامل يجمع بين مختلف التقنيات لمعالجة تحدي محدد. سيتضمن المشروع تقييم التقنيات المتاحة، اختيار الأنسب منها، تصميم الهيكل العام، والتنفيذ التفصيلي. سيتم التركيز على الابتكار وتوظيف أحدث التقنيات بشكل فعال."
      }
    };

    // Get the description for this specific title and category
    let description = "";
    if (descriptionsByCategory[category] && descriptionsByCategory[category][title]) {
      description = descriptionsByCategory[category][title];
    } else {
      // Fallback descriptions by category if the specific title is not found
      const fallbackDescriptions: Record<string, string[]> = {
        "ذكاء اصطناعي": [
          "يهدف هذا المشروع إلى استخدام تقنيات الذكاء الاصطناعي والتعلم الآلي لتطوير حلول مبتكرة في مجال التعليم. سيتضمن تحليل البيانات، بناء النماذج، واختبار الأداء مع التركيز على تحسين تجربة المستخدم النهائية.",
          "مشروع متقدم يوظف تقنيات معالجة اللغة الطبيعية والشبكات العصبية لحل مشكلات معقدة. سيشمل العمل جمع وتنظيف البيانات، تدريب النماذج، والتقييم باستخدام مقاييس دقيقة."
        ],
        "برمجة ويب": [
          "تطوير منصة ويب متكاملة باستخدام تقنيات حديثة في تطوير الويب. سيتضمن المشروع تصميم واجهات المستخدم، بناء واجهة برمجة التطبيقات، وتكامل قواعد البيانات مع التركيز على الأداء والأمان وتجربة المستخدم.",
          "إنشاء تطبيق ويب تفاعلي يعالج احتياجات محددة في المجال الأكاديمي. سيشمل المشروع تصميم معماري متقدم، تطوير الواجهة والخلفية، واختبار شامل مع التركيز على قابلية التوسع."
        ],
        "تطبيق حاسوب": [
          "تطوير برنامج سطح مكتب متقدم يقدم حلولًا للتحديات في البيئة الأكاديمية. سيتضمن المشروع تصميم واجهة مستخدم سهلة الاستخدام، معالجة البيانات بكفاءة، وتنفيذ خوارزميات متخصصة لتلبية المتطلبات المحددة.",
          "بناء تطبيق حاسوب قوي باستخدام تقنيات برمجة حديثة. سيركز المشروع على الأداء والموثوقية مع توفير ميزات متقدمة تخدم احتياجات المستخدمين المستهدفين."
        ],
        "تطبيق موبايل": [
          "تصميم وتطوير تطبيق موبايل شامل يدعم منصتي Android و iOS. سيتضمن المشروع واجهة مستخدم جذابة، معالجة بيانات فعالة، وتكامل مع خدمات الويب مع التركيز على تجربة مستخدم سلسة.",
          "إنشاء تطبيق موبايل مبتكر يلبي احتياجات الطلاب والأساتذة. سيشمل المشروع تصميم متجاوب، تخزين البيانات المحلية والسحابية، وميزات متقدمة تحسن العملية التعليمية."
        ],
        "unknown": [
          "مشروع متكامل يتضمن تحليل متطلبات دقيق، تصميم شامل، وتنفيذ باستخدام أفضل الممارسات والتقنيات. سيتم التركيز على تقديم حل مبتكر قابل للتطبيق في بيئة حقيقية.",
          "دراسة تحليلية وتطويرية تهدف إلى معالجة تحديات محددة. يشمل المشروع منهجية منظمة، تحليل عميق، وتوصيات عملية مع خطة تنفيذ واضحة."
        ]
      };
      
      // Select a random fallback description for the category
      const categoryFallbacks = fallbackDescriptions[category] || fallbackDescriptions["unknown"] || ["مشروع متقدم يستخدم تقنيات حديثة لحل مشكلة واقعية في المجال الأكاديمي."];
      description = faker.helpers.arrayElement(categoryFallbacks);
    }

    return description;
  };
  
  let projectCount = 0;

  for (const teacher of teachers) {
    for (let i = 0; i < projectsPerTeacher; i++) {
      const categoryIndex = i % categoryList.length;
      const category = categoryList[categoryIndex];
      
      // Get titles for this category
      const categoryKey = category || "unknown";
      const titles = projectTitlesByCategory[categoryKey] || [];
      // Select a random title from the category or use a fallback
      const title = titles.length > 0 
        ? faker.helpers.arrayElement(titles) 
        : `${categoryKey} Project ${i + 1}`;

      // Generate detailed description based on category and title
      const description = generateProjectDescription(categoryKey, title);

      await prisma.project.create({
        data: {
          id: faker.string.nanoid(),
          authorId: teacher.id,
          title: title,
          description: description,
          specialty: faker.helpers.arrayElement(Object.values(Specialty)),
          category: categoryKey,
        },
      });

      projectCount++;
    }
  }

  return { count: projectCount };
};

// Create proposals for students
const createProposalsForStudents = async (students: User[]) => {
  const projects = await prisma.project.findMany();
  let proposalCount = 0;

  for (const student of students) {
    // Each student makes exactly 3 proposals
    const numProposals = 3;
    const shuffledProjects = [...projects].sort(() => 0.5 - Math.random());
    const selectedProjects = shuffledProjects.slice(0, numProposals);

    for (const project of selectedProjects) {
      const status = faker.helpers.arrayElement(Object.values(ProposalStatus));
      // Only set lockedIn to true if status is "accepted"
      const lockedIn = status === ProposalStatus.ACCEPTED ? faker.datatype.boolean() : false;
      
      await prisma.proposal.create({
        data: {
          id: faker.string.nanoid(),
          projectId: project.id,
          proposerId: student.id,
          status: status,
          lockedIn: lockedIn,
        },
      });

      proposalCount++;
    }
  }

  return { count: proposalCount };
};

// Main seed function
async function main() {
  console.log("Starting database seeding...");

  // Clear existing data
  await prisma.proposal.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verification.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleared.");

  // Add default password to predefined users
  const teachersWithPassword = predefinedTeachers.map((teacher) => ({
    ...teacher,
    password: "password",
  }));

  const studentsWithPassword = predefinedStudents.map((student) => ({
    ...student,
    password: "password",
  }));

  // Create accounts for all users with auth.api.signUpEmail
  const createdTeacherAccounts = await createAccountsForUsers(
    teachersWithPassword as NewUser[]
  );
  console.log(`Created ${createdTeacherAccounts.length} teacher accounts.`);

  const createdStudentAccounts = await createAccountsForUsers(
    studentsWithPassword as NewUser[]
  );
  console.log(`Created ${createdStudentAccounts.length} student accounts.`);

  // Get the actual User records from the database for further operations
  const createdTeachers = await prisma.user.findMany({
    where: {
      email: {
        in: teachersWithPassword
          .map((t) => t.email)
          .filter((email): email is string => email !== undefined),
      },
    },
  });

  const createdStudents = await prisma.user.findMany({
    where: {
      email: {
        in: studentsWithPassword
          .map((s) => s.email)
          .filter((email): email is string => email !== undefined),
      },
    },
  });

  // Create 5 projects for each teacher
  const projectsCreated = await createProjectsForTeachers(createdTeachers, 5);
  console.log(
    `Created ${projectsCreated.count} projects (5 for each teacher).`
  );

  // Create 1-3 proposals for each student
  const proposalsCreated = await createProposalsForStudents(createdStudents);
  console.log(
    `Created ${proposalsCreated.count} proposals for students (1-3 per student).`
  );

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
