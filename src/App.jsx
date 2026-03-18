import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pageTabs = [
  { key: "what", num: "01", title: "设计思维是什么" },
  { key: "importance", num: "02", title: "设计思维的重要性" },
  { key: "steps", num: "03", title: "五个步骤" },
  { key: "applications", num: "04", title: "典型应用" },
  { key: "critique", num: "05", title: "批判反思" },
];

const steps = [
  {
    key: "Empathy",
    title: "Empathy",
    zh: "共情",
    accent: "#6aa971",
    angle: -88,
    summary:
      "目标：了解人们的潜在需求，看到表面表达背后更真实的想法和感受。做法：花时间去观察、访谈、与人相处，在具体情境中理解对方。",
    micro: ["Need", "Observe", "Understand"],
  },
  {
    key: "Define",
    title: "Define",
    zh: "定义",
    accent: "#7bb9c8",
    angle: -16,
    summary:
      "目标：重构并定义一个真正值得解决的问题，让后续方向更加清晰。做法：整理前期观察和信息，提炼关键矛盾，形成更聚焦的问题表达。",
    micro: ["Focus", "Insight", "Problem"],
  },
  {
    key: "Ideate",
    title: "Ideate",
    zh: "构思",
    accent: "#d08ab6",
    angle: 56,
    summary:
      "目标：想出尽可能多的解决方法，打开思路，扩展可能性。做法：通过头脑风暴等方式广泛生成想法，暂时不急着过早筛选。",
    micro: ["Diverge", "Generate", "Expand"],
  },
  {
    key: "Prototype",
    title: "Prototype",
    zh: "原型",
    accent: "#d3a05d",
    angle: 128,
    summary:
      "目标：设计出方案原型，把想法变成可以被看见、被理解、被讨论的初步版本。做法：进行快速、粗糙的尝试，在低成本条件下筛选更有效的方案。",
    micro: ["Make", "Try", "Visualize"],
  },
  {
    key: "Test",
    title: "Test",
    zh: "测试",
    accent: "#9a92d2",
    angle: 200,
    summary:
      "目标：获取关于原型的反馈，进一步了解方案在真实情境中的表现。做法：将初步原型投放到目标人群中，通过试用、观察和反馈继续优化。",
    micro: ["Feedback", "Refine", "Iterate"],
  },
];

const applications = [
  {
    title: "教学实践",
    subtitle: "Tina Seelig 的 5 美元任务",
    body:
      "Tina Seelig 给学生5美元，让他们发挥创意，在两小时内赚到尽量多的钱。这个案例强调的并不只是赚钱结果，更是学生如何重新理解“资源”“机会”和“价值创造”。",
    scene: "学生面对极小资源与极短时间，需要重新理解任务本身。",
    action: "观察限制条件，重新定义可用资源，再快速尝试不同路径。",
    value: "它体现了设计思维如何把有限条件转化为新的可能性。",
    tags: ["资源重估", "任务重构", "快速行动"],
  },
  {
    title: "媒体实践",
    subtitle: "从观众体验重新设计内容",
    body:
      "北京电视台运用设计思维，重新设计一档理想的旅游类节目。这一应用体现了从观众体验出发，重新思考内容、形式与传播方式。",
    scene: "节目设计不再只考虑表达者想说什么，也考虑观众真实想获得什么。",
    action: "从观众感受出发重写内容结构、叙事节奏与互动方式。",
    value: "它体现了设计思维如何把传播问题转化为体验设计问题。",
    tags: ["观众体验", "内容重写", "形式创新"],
  },
  {
    title: "公益实践",
    subtitle: "真实社会问题中的参与设计",
    body:
      "世界自然基金会 WWF 在三江源地区进行废弃饮料瓶回收活动。这个案例体现了设计思维如何进入真实社会问题，并围绕参与者行为与场景进行优化。",
    scene: "公益目标要进入真实生活场景，才可能形成持续参与。",
    action: "先理解参与者行为，再设计激励、流程与回收方式。",
    value: "它体现了设计思维如何让好意进一步变成可执行方案。",
    tags: ["社会场景", "参与机制", "落地执行"],
  },
  {
    title: "会计场景中的应用",
    subtitle: "流程优化与持续迭代",
    body:
      "通过访谈员工找准真实痛点，再将痛点转化为包含用户、问题与价值的清晰命题。随后跨部门跳出固有框架构思方案，接着以最简可用版本进行小范围原型验证，最后让用户试用并收集反馈，持续迭代。这一过程说明，设计思维同样可以进入流程优化、系统改进和管理协同之中。",
    scene: "组织内部常见的问题并不只来自流程表面，也来自真实使用中的摩擦。",
    action: "访谈员工，重构命题，跨部门构思，再用最简版本试行验证。",
    value: "它体现了设计思维如何进入管理协同、系统改进与流程优化。",
    tags: ["访谈痛点", "跨部门协同", "持续迭代"],
  },
];

const critiques = [
  "把对需求的观察变成团建活动。表面上参与感很强，实际对真实问题的理解并没有深入。",
  "把头脑风暴变成无效开会。想法很多，推进不足，最后难以形成真正可执行的方案。",
  "把简单原型做得过于精致。时间和精力被细节占据，快速验证的意义被削弱。",
  "把运用设计思维的过程变成目标，本末倒置。流程本身被看得过重，问题有没有真正被解决反而容易被忽略。",
];

function polarToCartesian(angleDeg, radius) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function Petal({
  className = "",
  rotate = 0,
  color = "rgba(189, 229, 203, 0.55)",
}) {
  return (
    <div
      className={`absolute h-24 w-14 rounded-full blur-[1px] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.65), ${color} 58%, rgba(255,255,255,0.08) 100%)`,
        border: "1.2px solid rgba(71, 85, 105, 0.15)",
      }}
    />
  );
}

function DoodleFlower({ className = "", size = 120 }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Petal className="left-1/2 top-0 -translate-x-1/2" rotate={0} />
      <Petal className="bottom-0 left-1/2 -translate-x-1/2" rotate={180} />
      <Petal className="left-0 top-1/2 -translate-y-1/2" rotate={90} />
      <Petal className="right-0 top-1/2 -translate-y-1/2" rotate={270} />
      <Petal
        className="left-[18%] top-[16%]"
        rotate={45}
        color="rgba(204, 235, 169, 0.5)"
      />
      <Petal
        className="right-[18%] top-[16%]"
        rotate={-45}
        color="rgba(204, 235, 169, 0.5)"
      />
      <Petal
        className="left-[18%] bottom-[16%]"
        rotate={135}
        color="rgba(204, 235, 169, 0.5)"
      />
      <Petal
        className="right-[18%] bottom-[16%]"
        rotate={-135}
        color="rgba(204, 235, 169, 0.5)"
      />
      <div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, #fff6c8, #f6d26b 58%, #dbb456 100%)",
          border: "1.5px solid rgba(92, 85, 52, 0.22)",
          boxShadow: "0 8px 20px rgba(219, 180, 86, 0.2)",
        }}
      />
    </div>
  );
}

function Cloud({ className = "", children }) {
  return (
    <div
      className={`relative rounded-[999px] px-6 py-5 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(234,245,255,0.95) 52%, rgba(211,229,247,0.9) 100%)",
        border: "1.5px solid rgba(114, 138, 162, 0.18)",
        boxShadow: "0 18px 40px rgba(170, 196, 222, 0.18)",
      }}
    >
      <div className="absolute -left-5 bottom-2 h-14 w-14 rounded-full bg-white/80 blur-[0.5px]" />
      <div className="absolute -right-3 top-4 h-12 w-12 rounded-full bg-white/80 blur-[0.5px]" />
      <div className="absolute left-10 -top-4 h-12 w-16 rounded-full bg-white/80 blur-[0.5px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionTitle({ kicker, title, subtitle, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.34em] text-slate-500">
        {kicker}
      </div>
      <h2 className="font-serif text-4xl leading-tight text-slate-800 md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Sticky({ text, index }) {
  const rotations = [-5, 3, -2, 6];
  const colors = [
    "linear-gradient(180deg, rgba(255,244,181,0.98), rgba(252,233,131,0.96))",
    "linear-gradient(180deg, rgba(255,228,226,0.98), rgba(251,207,232,0.95))",
    "linear-gradient(180deg, rgba(224,242,254,0.98), rgba(186,230,253,0.95))",
    "linear-gradient(180deg, rgba(233,213,255,0.98), rgba(216,180,254,0.95))",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: rotations[index] + 4 }}
      animate={{ opacity: 1, y: 0, rotate: rotations[index] }}
      whileHover={{ y: -6, rotate: rotations[index] + 1 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative min-h-[220px] rounded-[18px] p-6"
      style={{
        background: colors[index % colors.length],
        border: "1.4px solid rgba(71,85,105,0.12)",
        boxShadow: "0 16px 28px rgba(148,163,184,0.16)",
      }}
    >
      <div className="absolute left-1/2 top-2 h-5 w-16 -translate-x-1/2 rounded-full bg-white/45 blur-[1.5px]" />
      <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
        Reflection 0{index + 1}
      </div>
      <p className="font-serif text-[26px] leading-[1.45] text-slate-800">{text}</p>
      <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.25em] text-slate-500">
        revise
      </div>
    </motion.div>
  );
}

function TopNav({ page, setPage }) {
  const currentIndex = pageTabs.findIndex((item) => item.key === page);

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3 px-6 pt-4 md:px-10 lg:px-14">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.42em] text-slate-500">
          Design Thinking · Visual Prototype
        </div>
        <div className="mt-1.5 font-serif text-2xl text-slate-700 md:text-3xl">
          设计思维实验花园
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-wrap items-start gap-2 rounded-[24px] border border-slate-200/80 bg-white/60 px-3 py-2 shadow-sm backdrop-blur">
          {pageTabs.map((item) => {
            const active = item.key === page;
            return (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className="flex w-[90px] flex-col items-center gap-1.5 text-center"
              >
                <span
                  className={`text-[10px] leading-3.5 ${
                    active ? "text-slate-700" : "text-slate-500"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] transition ${
                    active
                      ? "border-slate-300 bg-white text-slate-700 shadow-sm"
                      : "border-slate-200/80 bg-white/70 text-slate-500"
                  }`}
                >
                  {item.num}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 text-[10px] tracking-[0.16em] text-slate-500 shadow-sm backdrop-blur">
          <button
            onClick={() =>
              setPage(pageTabs[(currentIndex - 1 + pageTabs.length) % pageTabs.length].key)
            }
            className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-slate-600 transition hover:bg-white"
          >
            Prev
          </button>
          <span>
            {currentIndex + 1} / {pageTabs.length}
          </span>
          <button
            onClick={() => setPage(pageTabs[(currentIndex + 1) % pageTabs.length].key)}
            className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-slate-600 transition hover:bg-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function BrokenOuroboros({ selected, setSelected }) {
  const activeStep = steps.find((s) => s.key === selected) || steps[0];

  const path = useMemo(() => {
    const r = 120;
    const start = polarToCartesian(-38, r);
    const end = polarToCartesian(252, r);
    return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`;
  }, []);

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
      <div className="relative flex h-[420px] w-[420px] items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100/20 blur-3xl" />

        <svg viewBox="-170 -170 340 340" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="ouro-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8ab88d" />
              <stop offset="32%" stopColor="#b5c3ef" />
              <stop offset="68%" stopColor="#e4b6cb" />
              <stop offset="100%" stopColor="#e6c27c" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3.6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={path}
            fill="none"
            stroke="url(#ouro-main)"
            strokeWidth="24"
            strokeLinecap="round"
            filter="url(#softGlow)"
            opacity="0.92"
          />
          <path
            d={path}
            fill="none"
            stroke="rgba(69,85,99,0.18)"
            strokeWidth="26"
            strokeDasharray="1 16"
            strokeLinecap="round"
          />

          <g transform="translate(112 -55) rotate(-18)">
            <path
              d="M 14 0 C 45 6, 67 24, 72 46 C 51 39, 36 41, 15 57 C 12 38, 8 22, 0 11 Z"
              fill="#95c28d"
              stroke="rgba(70,85,74,0.25)"
              strokeWidth="2"
            />
            <circle cx="48" cy="30" r="3.2" fill="#334155" />
          </g>

          <g transform="translate(106 -8) rotate(13)">
            <path
              d="M 0 0 C 18 -2, 28 2, 42 12"
              stroke="#95c28d"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 0 0 C 14 10, 24 19, 34 36"
              stroke="#95c28d"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          <g transform="translate(-102 78)">
            <path
              d="M 0 0 C 12 14, 19 18, 36 18 C 30 5, 27 -5, 31 -20"
              stroke="#e2bf72"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>

        {steps.map((step) => {
          const pos = polarToCartesian(step.angle, 120);
          const isActive = step.key === selected;
          return (
            <motion.button
              key={step.key}
              whileHover={{ scale: 1.06, y: -2 }}
              onClick={() => setSelected(step.key)}
              className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                background: isActive
                  ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), ${step.accent}88 68%, ${step.accent}dd 100%)`
                  : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.96), rgba(252,250,245,0.92) 70%, rgba(236,232,223,0.9) 100%)",
                border: `2px solid ${isActive ? step.accent : "rgba(90, 99, 112, 0.16)"}`,
                boxShadow: isActive
                  ? `0 16px 30px ${step.accent}40`
                  : "0 12px 24px rgba(148, 163, 184, 0.14)",
              }}
            >
              <span className="font-serif text-[15px] text-slate-800">{step.title}</span>
              <span className="mt-0.5 text-[12px] tracking-[0.18em] text-slate-500">
                {step.zh}
              </span>
            </motion.button>
          );
        })}

        <motion.div
          key={activeStep.key}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-20 flex h-44 w-44 flex-col items-center justify-center rounded-full px-5 text-center"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.98), rgba(251,248,242,0.95) 70%, rgba(239,232,222,0.95) 100%)",
            border: "1.5px solid rgba(100, 116, 139, 0.16)",
            boxShadow: "0 18px 40px rgba(148, 163, 184, 0.18)",
          }}
        >
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.34em] text-slate-500">
            Five Steps
          </div>
          <div className="font-serif text-2xl text-slate-800">可以回档的</div>
          <div className="font-serif text-2xl text-slate-800">“衔尾蛇”</div>
          <div className="mt-3 text-xs leading-5 text-slate-500">
            反复再修正和循环的路径
          </div>
        </motion.div>
      </div>

      <motion.div
        key={activeStep.key + "-panel"}
        initial={{ opacity: 0, x: 22 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl rounded-[32px] border border-slate-200/70 bg-white/65 p-8 shadow-[0_18px_60px_rgba(148,163,184,0.15)] backdrop-blur-xl"
      >
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          Five Modes
        </div>
        <div className="flex items-end gap-3">
          <h3 className="font-serif text-4xl text-slate-800">{activeStep.title}</h3>
          <div className="pb-1 text-sm tracking-[0.2em] text-slate-500">{activeStep.zh}</div>
        </div>
        <p className="mt-4 text-[15px] leading-8 text-slate-600">{activeStep.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {activeStep.micro.map((item) => (
            <span
              key={item}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-700"
              style={{
                background: `${activeStep.accent}20`,
                border: `1px solid ${activeStep.accent}55`,
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-7 rounded-[24px] bg-slate-50/90 p-5 text-sm leading-7 text-slate-500">
          点击外圈的五个步骤，可以分别查看每一步的目标与做法。
        </div>
      </motion.div>
    </div>
  );
}

function WhatPage() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-2 md:px-10 lg:px-14">
      <div className="grid min-h-[calc(100vh-130px)] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-slate-500">
              Part 01 · What it is
            </div>
            <h1 className="max-w-4xl font-serif text-[48px] leading-[1.04] text-slate-800 md:text-[72px] lg:text-[88px]">
              设计思维
              <br />
              是什么
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              本质：一种解决问题的创新方法，用于识别问题，并以更有创造性的方式推进解决，是一套系统化的问题解决路径。
            </p>
          </motion.div>

          <svg
            className="pointer-events-none absolute -left-4 top-8 h-[380px] w-[620px] opacity-70"
            viewBox="0 0 620 380"
            fill="none"
          >
            <path
              className="grow-vine"
              d="M20 320 C 92 250, 110 198, 152 150 C 188 108, 238 88, 290 95 C 340 102, 378 131, 404 170 C 438 221, 476 242, 592 205"
              stroke="#8bb78f"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              className="grow-vine"
              d="M66 344 C 140 300, 178 284, 202 242 C 236 183, 242 122, 214 71"
              stroke="#b0c98f"
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              className="grow-vine"
              d="M252 278 C 312 262, 346 270, 394 312"
              stroke="#a9c4de"
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ animationDelay: "0.35s" }}
            />
          </svg>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:max-w-4xl">
            {[
              [
                "目标",
                "形成以人为本地发现问题、理解问题、解决问题，并进一步获得创新解决方案的能力。",
              ],
              [
                "要素",
                "开放且善于思考的方法；以最终客户为中心；相互关联的小型周期迭代流程。",
              ],
              [
                "特征",
                "客户中心、目标导向、天马行空、广集想法、万事皆可、变换角度、打破常规。",
              ],
              [
                "理解方式",
                "它更像一座会生长的花园，从真实需求出发，在观察、构思、尝试和修正中慢慢长出更好的方案。",
              ],
            ].map(([k, v], index) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.5 }}
                className="rounded-[24px] border border-slate-200/70 bg-white/58 p-5 shadow-[0_16px_30px_rgba(148,163,184,0.12)] backdrop-blur-xl"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-700/70">
                  {k}
                </div>
                <div className="mt-3 text-[15px] leading-7 text-slate-600">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[560px] items-center justify-center">
          <motion.div
            className="float-soft absolute right-[8%] top-[9%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <DoodleFlower size={136} />
          </motion.div>

          <motion.div
            className="float-slower absolute left-[2%] top-[30%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <DoodleFlower size={100} />
          </motion.div>

          <motion.div
            className="float-soft absolute right-[10%] bottom-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
          >
            <DoodleFlower size={112} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mx-auto max-w-md rounded-[38px] border border-white/60 bg-white/58 p-8 shadow-[0_22px_60px_rgba(148,163,184,0.16)] backdrop-blur-2xl"
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
              seed note
            </div>
            <div className="font-serif text-4xl leading-tight text-slate-800">从真实世界中生根</div>
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              开放思考像土壤，以人为本像根系，迭代流程像生长节律。保留植物与花的比喻，是为了让方法本身更容易被看见和记住。
            </p>
            <div className="mt-6 rounded-[20px] bg-emerald-50/70 px-4 py-4 text-sm leading-7 text-slate-600">
              Root = 真实需求｜Stem = 问题理解｜Branch = 方案生成｜Bloom = 创新解法
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ImportancePage() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-14">
      <div className="min-h-[calc(100vh-130px)]">
        <SectionTitle
          kicker="Part 02 · Why it matters"
          title="设计思维的重要性"
          subtitle="环境复杂、多变、不确定，只追求标准答案的模式已经难以覆盖许多真实情境中的问题。"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {[
            [
              "对现实问题的意义",
              "设计思维更适合处理模糊、开放、贴近现实的问题，也更适合面对那些边界并不清晰的任务。",
            ],
            [
              "对学习者的意义",
              "设计思维能够培养问题意识、合作能力、创造能力、行动能力和韧性。它也让失败从单纯的结果落差，变成推动学习和修正的重要机制。",
            ],
            [
              "对教育的意义",
              "推动课堂从知识传递转向真实问题解决，从教师主导转向学生参与，从低风险标准任务转向开放式试验与迭代。这样一来，学习过程会更贴近现实世界中的思考和行动方式。",
            ],
          ].map(([title, body], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={index === 1 ? "pt-8 lg:pt-16" : index === 2 ? "pt-3 lg:pt-9" : ""}
            >
              <Cloud className="float-soft min-h-[250px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                  meaning 0{index + 1}
                </div>
                <h3 className="mt-3 font-serif text-3xl text-slate-800">{title}</h3>
                <p className="mt-4 text-[15px] leading-8 text-slate-600">{body}</p>
              </Cloud>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsPage({ selected, setSelected }) {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-14">
      <div className="min-h-[calc(100vh-130px)]">
        <SectionTitle
          kicker="Part 03 · Five steps"
          title="五个步骤"
          subtitle="从共情到测试，每一步都在帮助我们更靠近真实问题，也更靠近真正可用的方案。"
          align="center"
        />
        <div className="mt-8">
          <BrokenOuroboros selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </section>
  );
}

function ApplicationsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = applications[activeIndex];

  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-14">
      <div className="grid min-h-[calc(100vh-130px)] items-start gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="sticky top-8">
          <SectionTitle
            kicker="Part 04 · Applications"
            title="典型应用"
            subtitle="设计思维可以进入不同场景。点左侧 chapter，再看右侧当前案例的具体展开。"
          />

          <div className="mt-8 space-y-4">
            {applications.map((item, index) => {
              const activeCard = index === activeIndex;
              return (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveIndex(index)}
                  className="group relative w-full overflow-hidden rounded-[24px] p-5 text-left"
                  style={{
                    background: activeCard
                      ? "linear-gradient(180deg, rgba(255,252,246,0.99), rgba(246,237,222,0.99))"
                      : "linear-gradient(180deg, rgba(255,250,241,0.96), rgba(244,233,215,0.96))",
                    border: activeCard
                      ? "1.8px solid rgba(120, 100, 72, 0.28)"
                      : "1.5px solid rgba(146, 123, 87, 0.18)",
                    boxShadow: activeCard
                      ? "0 18px 36px rgba(180, 151, 115, 0.18)"
                      : "0 12px 26px rgba(180, 151, 115, 0.12)",
                  }}
                >
                  <div className="absolute inset-y-0 left-0 w-4 rounded-l-[24px] bg-[linear-gradient(180deg,rgba(191,151,96,0.88),rgba(153,109,67,0.92))]" />
                  <div className="pl-4 pr-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700/70">
                      Chapter 0{index + 1}
                    </div>
                    <div className="mt-3 font-serif text-[28px] leading-tight text-slate-800">
                      {item.title}
                    </div>
                    <div className="mt-2 text-sm tracking-[0.14em] text-slate-500">
                      {item.subtitle}
                    </div>
                    {activeCard ? (
                      <div className="mt-4 inline-flex rounded-full border border-amber-200 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-700">
                        Active
                      </div>
                    ) : null}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.28 }}
            className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/62 p-8 shadow-[0_22px_54px_rgba(148,163,184,0.15)] backdrop-blur-xl"
          >
            <div className="absolute left-0 top-0 h-full w-10 bg-[linear-gradient(180deg,rgba(196,171,130,0.22),rgba(153,109,67,0.14))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_48%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
                opened chapter
              </div>
              <div className="mt-3 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <h3 className="font-serif text-5xl leading-tight text-slate-800">
                    {active.title}
                  </h3>
                  <div className="mt-3 text-base tracking-[0.14em] text-slate-500">
                    {active.subtitle}
                  </div>

                  <div className="mt-6 rounded-[26px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.95),rgba(247,241,232,0.92))] p-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      案例介绍
                    </div>
                    <p className="mt-4 text-[16px] leading-9 text-slate-600">{active.body}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-xs tracking-[0.16em] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    ["场景", active.scene, "from-emerald-50/90 to-lime-50/80", "border-emerald-100"],
                    ["关键动作", active.action, "from-sky-50/90 to-cyan-50/80", "border-sky-100"],
                    ["体现价值", active.value, "from-amber-50/90 to-orange-50/80", "border-amber-100"],
                  ].map(([title, body, tone, border], idx) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`rounded-[24px] border bg-gradient-to-br ${tone} ${border} p-5`}
                    >
                      <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                        {title}
                      </div>
                      <p className="mt-3 text-[14px] leading-8 text-slate-600">{body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CritiquePage() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-14">
      <div className="min-h-[calc(100vh-130px)]">
        <SectionTitle
          kicker="Part 06 · Conclusion"
          title="结论"
          subtitle="方法像指南针，问题像地形图。方法帮助校准方向，问题决定真正要穿过的现实。"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/62 p-8 shadow-[0_18px_50px_rgba(148,163,184,0.14)] backdrop-blur-xl md:p-10"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.42)_18%,transparent_36%)] shimmer opacity-70" />
            <div className="relative z-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.34em] text-slate-500">
                final image
              </div>
              <h3 className="mt-4 font-serif text-4xl leading-tight text-slate-800 md:text-5xl">
                指南针与地形图
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                方法重要，问题本身更重要。设计思维提供观察、定义、构思、原型和测试的路径，但真正决定方向、边界与检验标准的，仍然是问题有没有被看清。
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[28px] border border-emerald-100 bg-[linear-gradient(180deg,rgba(245,252,247,0.96),rgba(236,247,239,0.92))] p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                    method
                  </div>
                  <div className="mt-3 text-[18px] font-semibold text-slate-700">指南针</div>
                  <div className="mt-5 flex items-center justify-center py-4">
                    <div className="relative h-32 w-32 rounded-full border-2 border-slate-300 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(242,247,244,0.92))] shadow-sm">
                      <div className="absolute left-1/2 top-3 h-[104px] w-px -translate-x-1/2 bg-slate-300" />
                      <div className="absolute left-3 top-1/2 h-px w-[104px] -translate-y-1/2 bg-slate-300" />
                      <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-[96%] border-x-[12px] border-b-[30px] border-x-transparent border-b-emerald-400" />
                      <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 translate-y-[10%] border-x-[12px] border-t-[28px] border-x-transparent border-t-slate-300" />
                    </div>
                  </div>
                  <p className="text-[14px] leading-8 text-slate-600">
                    方法帮助我们校准方向，组织步骤，提高试错效率，也让合作与修正有了更清楚的节奏。
                  </p>
                </div>

                <div className="rounded-[28px] border border-amber-100 bg-[linear-gradient(180deg,rgba(255,252,245,0.96),rgba(246,239,228,0.92))] p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                    problem
                  </div>
                  <div className="mt-3 text-[18px] font-semibold text-slate-700">地形图</div>
                  <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-white/70 p-3">
                    <svg viewBox="0 0 260 150" className="h-[150px] w-full" fill="none">
                      <path
                        d="M18 108C48 86 72 90 92 72C108 58 132 42 168 54C195 63 214 60 242 38"
                        stroke="#b89358"
                        strokeWidth="2.2"
                      />
                      <path
                        d="M22 126C58 104 96 108 119 92C141 77 163 76 191 84C214 91 230 83 248 67"
                        stroke="#caa66c"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 87C41 69 68 62 92 44C110 31 140 26 174 36C207 46 229 41 246 20"
                        stroke="#d4b986"
                        strokeWidth="2"
                      />
                      <path
                        d="M59 117C72 104 83 99 98 99C118 99 127 115 144 115C159 115 172 105 182 93"
                        stroke="#aa8d5f"
                        strokeWidth="1.8"
                      />
                      <circle cx="186" cy="84" r="6" fill="#d97272" />
                    </svg>
                  </div>
                  <p className="mt-3 text-[14px] leading-8 text-slate-600">
                    问题决定你真正面对的现实，决定阻力、边界、路径和目标。问题看错，流程再完整，结果也会偏离。
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[30px] border border-slate-200/80 bg-white/88 px-6 py-5 text-center shadow-sm">
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  guiding sentence
                </div>
                <div className="mt-2 font-serif text-[28px] leading-tight text-slate-800 md:text-[34px]">
                  方法重要，<span className="text-amber-700">问题本身</span>更重要
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200/70 bg-white/62 p-6 shadow-[0_18px_40px_rgba(148,163,184,0.12)] backdrop-blur-xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                why this matters
              </div>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                设计思维真正的价值，不在于把流程走得多完整，而在于它能否帮助我们更准确地理解问题，更有效地回应需求，并推动方案进入现实。
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white/62 p-6 shadow-[0_18px_40px_rgba(148,163,184,0.12)] backdrop-blur-xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                keep in mind
              </div>
              <ul className="mt-4 space-y-3 text-[15px] leading-8 text-slate-600">
                <li>观察要走向真实理解</li>
                <li>构思要走向可执行方案</li>
                <li>原型要服务快速验证</li>
                <li>流程要回到问题改善本身</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white/62 p-6 shadow-[0_18px_40px_rgba(148,163,184,0.12)] backdrop-blur-xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
                closing line
              </div>
              <p className="mt-4 text-[15px] leading-8 text-slate-600">
                所以，设计思维值得重视，但它最终仍然要服务于更清楚的问题理解。方法给出路径，问题决定终点。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {critiques.map((item, index) => (
            <Sticky key={item} text={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selected, setSelected] = useState("Empathy");
  const [page, setPage] = useState("what");

  return (
    <div
      className="min-h-screen overflow-x-hidden text-slate-800"
      style={{
        background:
          "radial-gradient(circle at 12% 10%, rgba(219,244,224,0.55), transparent 22%), radial-gradient(circle at 86% 8%, rgba(221,233,255,0.5), transparent 22%), radial-gradient(circle at 88% 68%, rgba(255,220,235,0.35), transparent 24%), radial-gradient(circle at 10% 78%, rgba(255,234,190,0.28), transparent 24%), linear-gradient(180deg, #f7f2ea 0%, #fbf8f3 45%, #f7f1e7 100%)",
      }}
    >
      <style>{`
        .paper-noise::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            radial-gradient(rgba(35,40,47,0.12) 0.6px, transparent 0.8px),
            radial-gradient(rgba(35,40,47,0.08) 0.45px, transparent 0.7px);
          background-size: 18px 18px, 23px 23px;
          background-position: 0 0, 9px 11px;
          mix-blend-mode: multiply;
        }

        .float-soft {
          animation: floatSoft 8s ease-in-out infinite;
        }

        .float-slower {
          animation: floatSoft 11s ease-in-out infinite;
        }

        .grow-vine {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: vineGrow 2.4s ease forwards;
        }

        .shimmer {
          animation: shimmer 5.5s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes vineGrow {
          to { stroke-dashoffset: 0; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="paper-noise relative">
        <TopNav page={page} setPage={setPage} />

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
          >
            {page === "what" && <WhatPage />}
            {page === "importance" && <ImportancePage />}
            {page === "steps" && (
              <StepsPage selected={selected} setSelected={setSelected} />
            )}
            {page === "applications" && <ApplicationsPage />}
            {page === "critique" && <CritiquePage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
