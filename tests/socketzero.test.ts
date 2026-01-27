/**
 * Copyright 2024 Defense Unicorns
 * SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial
 */

import { test, expect } from "@playwright/test";

test('SocketZero UI loads successfully', async ({ page }) => {
  // Test that the SocketZero application loads
  await page.goto('/');
  
  // Wait for the page to load and check for SocketZero-specific content
  await expect(page).toHaveTitle(/SocketZero/);
  
  // Check that the main interface elements are present
  await expect(page.locator('body')).toBeVisible();
});

test('SocketZero authentication flow', async ({ page }) => {
  // Test SSO integration by attempting to access protected content
  await page.goto('/');
  
  // Check if redirected to authentication or if already authenticated
  const currentUrl = page.url();
  
  if (currentUrl.includes('/login') || currentUrl.includes('auth')) {
    // If redirected to login, verify the SSO flow is working
    await expect(page).toHaveURL(/login|auth/);
    
    // Look for authentication elements
    await expect(page.locator('form, .login, .auth')).toBeVisible();
  } else {
    // If already authenticated, verify main interface is accessible
    await expect(page.locator('body')).toBeVisible();
  }
});
