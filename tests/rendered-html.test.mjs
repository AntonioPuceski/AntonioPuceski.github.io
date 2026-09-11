import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/portfolio.tsx", import.meta.url), "utf8");
const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");

test("contains the complete recruiter-facing information architecture", () => {
  for (const section of ["about", "experience", "projects", "skills", "contact"]) {
    assert.match(page, new RegExp(`id=\\"${section}\\"`));
  }
  assert.match(page, /Skip to content/);
  assert.match(page, /aria-expanded/);
});

test("publishes accurate metadata and verified projects", () => {
  assert.match(index, /Antonio Puceski \| Software Engineer/);
  assert.match(index, /https:\/\/antoniopuceski\.github\.io/);
  for (const project of ["GymTracker", "Personal Finance Manager", "Smart Incident Detection", "Split Settle", "Computer Vision Sensor Hub"]) {
    assert.match(data, new RegExp(project));
  }
  assert.doesNotMatch(page, /Expected completion: September 2026/);
});
