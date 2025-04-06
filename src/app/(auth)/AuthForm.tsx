"use client";
import React, { useActionState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AuthForm = ({ isSignup, action }: { isSignup: boolean; action: (prevState: unknown, f: FormData) => Promise<unknown> }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(action, undefined);

  return (
    <section className="h-screen flex flex-col bg-gradient-to-r from-gray-900 to-black text-white">
      <section
        className="h-screen flex flex-col bg-no-repeat bg-center bg-cover bg-blend-multiply"
        style={{
          backgroundImage: `url("https://plus.unsplash.com/premium_vector-1739011065203-e4302679e9c2?q=80&w=2652&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          
        }}
      >
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          action={formAction}
          className="m-auto flex flex-col justify-center items-center bg-black border border-white/20 shadow-lg rounded-2xl p-6 gap-4 w-96"
        >
          <motion.h4
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold"
          >
            {isSignup ? "Register" : "Login"} from here!
          </motion.h4>
          {isSignup && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-light my-2" htmlFor="name">
                Name
              </label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </motion.div>
          )}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-light my-2" htmlFor="username">
              username
            </label>
            <input type="username" id="username" name="username" className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-light my-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white rounded-lg shadow-md hover:shadow-lg"
          >
            {isSignup ? "Register" : "Login"}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => router.push(isSignup ? "/login" : "/register")}
            className="block text-sm text-blue-500 mt-2 underline"
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Register"}
          </motion.button>
        </motion.form>
      </section>
    </section>
  );
};

export default AuthForm;

