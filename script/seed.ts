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

      await prisma.project.create({
        data: {
          id: faker.string.nanoid(),
          authorId: teacher.id,
          title: title,
          description: faker.lorem.paragraphs(1),
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
