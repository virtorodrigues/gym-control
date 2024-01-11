import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { ICreateUser } from "./types";
import { treatments } from "./treatments";

export async function GET(request: NextRequest) {
  const comapny = await prismaClient.user.findUniqueOrThrow();

  return NextResponse.json(comapny);
}
