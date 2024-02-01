const prisma = require("../utils/prisma");

const EmbedConfig = {
  writable: [
    // Used for generic updates so we can validate keys in request body
    "allowlist_domains",
    "allow_model_override",
    "chat_mode",
  ],

  new: async function (name = null, creatorId = null) {
    // if (!name) return { result: null, message: "name cannot be null" };
    // try {
    //   const workspace = await prisma.embed_configs.create({
    //     data: { name, slug },
    //   });
    //   return { workspace, message: null };
    // } catch (error) {
    //   console.error(error.message);
    //   return { workspace: null, message: error.message };
    // }
  },

  update: async function (id = null, data = {}) {
    // if (!id) throw new Error("No workspace id provided for update");
    // const validKeys = Object.keys(data).filter((key) =>
    //   this.writable.includes(key)
    // );
    // if (validKeys.length === 0)
    //   return { workspace: { id }, message: "No valid fields to update!" };
    // try {
    //   const workspace = await prisma.embed_configs.update({
    //     where: { id },
    //     data,
    //   });
    //   return { workspace, message: null };
    // } catch (error) {
    //   console.error(error.message);
    //   return { workspace: null, message: error.message };
    // }
  },

  get: async function (clause = {}) {
    try {
      const embedConfig = await prisma.embed_configs.findFirst({
        where: clause,
      });

      return embedConfig || null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  getWithWorkspace: async function (clause = {}) {
    try {
      const embedConfig = await prisma.embed_configs.findFirst({
        where: clause,
        include: {
          workspace: true,
        },
      });

      return embedConfig || null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  delete: async function (clause = {}) {
    try {
      await prisma.embed_configs.delete({
        where: clause,
      });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },

  where: async function (clause = {}, limit = null, orderBy = null) {
    try {
      const results = await prisma.embed_configs.findMany({
        where: clause,
        ...(limit !== null ? { take: limit } : {}),
        ...(orderBy !== null ? { orderBy } : {}),
      });
      return results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },
};

module.exports = { EmbedConfig };