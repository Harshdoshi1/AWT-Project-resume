"use client";

import React from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa";
import ClickSpark from '../ClickSpark';

const FooterComponent = () => {
  return (
    <footer className="bg-[#191A19] text-[#D8E9A8] py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#4E9F3D]">About Skill Fit Resume</h3>
          <p className="text-sm">
            A modern resume builder with AI-powered templates and analytics.
          </p>
          <p className="text-xs text-[#B4BDFF]">
            Developed by Harsh Doshi, Aryan Mahida & Harshvardhan Soni
          </p>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#4E9F3D]">Legal</h3>
          <ClickSpark>
            <a href="#" className="block text-sm hover:text-[#B4BDFF] transition-colors">Privacy Policy</a>
          </ClickSpark>
          <ClickSpark>
            <a href="#" className="block text-sm hover:text-[#B4BDFF] transition-colors">Terms of Service</a>
          </ClickSpark>
          <ClickSpark>
            <a href="#" className="block text-sm hover:text-[#B4BDFF] transition-colors">Cookie Policy</a>
          </ClickSpark>
        </div>

        {/* Social Media */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#4E9F3D]">Connect With Us</h3>
          <div className="flex space-x-4">
            <ClickSpark>
              <a href="#" className="text-xl hover:text-[#B4BDFF] transition-colors">
                <BsFacebook />
              </a>
            </ClickSpark>
            <ClickSpark>
              <a href="#" className="text-xl hover:text-[#B4BDFF] transition-colors">
                <BsInstagram />
              </a>
            </ClickSpark>
            <ClickSpark>
              <a href="#" className="text-xl hover:text-[#B4BDFF] transition-colors">
                <BsTwitter />
              </a>
            </ClickSpark>
            <ClickSpark>
              <a href="#" className="text-xl hover:text-[#B4BDFF] transition-colors">
                <BsLinkedin />
              </a>
            </ClickSpark>
            <ClickSpark>
              <a href="#" className="text-xl hover:text-[#B4BDFF] transition-colors">
                <BsGithub />
              </a>
            </ClickSpark>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-8 pt-4 border-t border-[#4E9F3D] text-center text-sm flex items-center justify-center">
        <FaRegCopyright className="mr-1" />
        {new Date().getFullYear()} Skill Fit Resume. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;